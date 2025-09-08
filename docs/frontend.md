# 🎨 フロントエンド開発指針

**Next.js + React + urql + MUI** による、モダンでアクセシブルなユーザーインターフェース開発ガイドライン。

---

## 🛠️ 技術スタック

### Core Technologies
- **Framework**: Next.js 15 (Pages Router)
- **UI Library**: React 19 + TypeScript
- **GraphQL Client**: urql (軽量・高性能)
- **Component Library**: Material-UI (MUI) v7
- **State Management**: React Context + urql Cache

### Styling & Design
- **CSS Framework**: Tailwind CSS v3
- **Component Styling**: styled-components + MUI Theme
- **Icons**: Material Icons + Lucide React
- **Responsive Design**: Mobile-First approach

### Development Tools
- **Type Safety**: TypeScript + GraphQL Code Generator
- **Code Quality**: ESLint + Prettier + Husky
- **Testing**: Jest + React Testing Library

---

## 📁 ディレクトリ構造

### プロジェクト全体構成
```
src/
├── app/                    # Next.js App Router (新規機能用)
│   ├── globals.css         # グローバルスタイル
│   ├── layout.tsx          # ルートレイアウト
│   └── favicon.ico         # ファビコン
├── pages/                  # Pages Router (既存機能)
│   ├── index.tsx           # ホームページ
│   ├── artworks/           # 作品関連ページ
│   ├── users/              # ユーザープロフィール
│   ├── admin/              # 管理者ページ
│   └── api/                # API Routes (バックエンド)
├── components/             # 再利用可能コンポーネント
├── contexts/               # React Context（状態管理）
├── hooks/                  # カスタムフック
├── lib/                    # ユーティリティ・設定
├── utils/                  # ヘルパー関数
├── types/                  # TypeScript型定義
├── constants/              # 定数定義
└── generated/              # 自動生成ファイル
```

### コンポーネント設計原則
```
src/components/
├── ui/                     # Atomic Design - Atoms
│   ├── Button.tsx          # 基本ボタン
│   ├── Input.tsx           # 入力フィールド
│   └── Icon.tsx            # アイコン
├── forms/                  # Molecules - フォーム要素
│   ├── LoginForm.tsx       # ログインフォーム
│   └── CommentForm.tsx     # コメント投稿
├── layouts/                # Templates - レイアウト
│   ├── Header.tsx          # ヘッダー
│   ├── Footer.tsx          # フッター
│   └── Sidebar.tsx         # サイドバー
└── features/               # Organisms - 機能単位
    ├── artwork/            # 作品機能
    ├── user/               # ユーザー機能
    └── admin/              # 管理機能
```

---

## 🔗 GraphQL統合

### urqlクライアント設定
```typescript
// lib/urql.ts
import { createClient, cacheExchange, fetchExchange } from 'urql';
import { persistedExchange } from '@urql/exchange-persisted-queries';

const client = createClient({
  url: '/api/graphql',
  exchanges: [
    cacheExchange,
    persistedExchange({
      preferGetForPersistedQueries: true,
    }),
    fetchExchange,
  ],
  fetchOptions: {
    credentials: 'include', // Cookieベース認証
  },
});
```

### Persisted Queries対応
```typescript
// hooks/useArtworks.ts
import { useQuery } from 'urql';
import { GetArtworksDocument } from '../generated/generated-graphql';

export const useArtworks = (filters?: ArtworkFilters) => {
  const [result] = useQuery({
    query: GetArtworksDocument,
    variables: { filters },
    // Persisted Operationが自動適用
  });

  return {
    artworks: result.data?.artworks || [],
    loading: result.fetching,
    error: result.error,
  };
};
```

### TypeScript型安全性
```typescript
// generated/generated-graphql.ts（自動生成）
export type User = {
  __typename?: 'User';
  id: string;
  name: string;
  email: string;
  introduction?: string | null;
};

// コンポーネントで型安全に使用
const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.introduction}</p>
    </div>
  );
};
```

---

## 🎨 UI/UXコンポーネント設計

### MUIテーマカスタマイズ
```typescript
// lib/theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Noto Sans JP", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});
```

### レスポンシブデザインパターン
```typescript
// hooks/useResponsive.tsx
import { useTheme, useMediaQuery } from '@mui/material';

export const useResponsive = () => {
  const theme = useTheme();
  
  return {
    isMobile: useMediaQuery(theme.breakpoints.down('sm')),
    isTablet: useMediaQuery(theme.breakpoints.between('sm', 'md')),
    isDesktop: useMediaQuery(theme.breakpoints.up('md')),
  };
};

// コンポーネントで使用
const ArtworkGrid: React.FC = () => {
  const { isMobile } = useResponsive();
  
  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      {/* レスポンシブレイアウト */}
    </Grid>
  );
};
```

### ダークモード対応
```typescript
// hooks/useDarkMode.tsx
export const useDarkMode = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true';
    }
    return false;
  });

  const toggleDarkMode = useCallback(() => {
    const newMode = !isDark;
    setIsDark(newMode);
    localStorage.setItem('darkMode', newMode.toString());
  }, [isDark]);

  return { isDark, toggleDarkMode };
};
```

---

## 🔐 認証・認可の実装

### AuthContext設計
```typescript
// contexts/AuthContexts.tsx
interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 認証ガード実装
```typescript
// components/guards/AuthGuard.tsx
interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAdmin = false,
  fallback = <LoginDialog open={true} />,
}) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <Preparing />;
  }

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  if (requireAdmin && !isAdmin) {
    return <NotFound message="アクセス権限がありません" />;
  }

  return <>{children}</>;
};
```

### ページレベル保護
```typescript
// pages/admin/dashboard.tsx
const AdminDashboard: NextPage = () => {
  return (
    <AuthGuard requireAdmin>
      <AdminDashboardContent />
    </AuthGuard>
  );
};

export default AdminDashboard;
```

---

## 📱 ナビゲーション & ルーティング

### ヘッダーナビゲーション
```typescript
// components/Header.tsx
const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { isMobile } = useResponsive();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link href="/">Polygonal Auxions</Link>
        </Typography>
        
        {isMobile ? (
          <MobileMenu user={user} onLogout={logout} />
        ) : (
          <DesktopMenu user={user} onLogout={logout} />
        )}
      </Toolbar>
    </AppBar>
  );
};
```

### 動的ルーティング
```typescript
// pages/artworks/[id].tsx
import { GetServerSideProps } from 'next';

interface ArtworkPageProps {
  artworkId: string;
}

const ArtworkPage: NextPage<ArtworkPageProps> = ({ artworkId }) => {
  const { artwork, loading, error } = useArtwork(artworkId);

  if (loading) return <Preparing />;
  if (error || !artwork) return <NotFound />;

  return <ArtworkDetail artwork={artwork} />;
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      artworkId: params?.id as string,
    },
  };
};

export default ArtworkPage;
```

---

## 🎯 状態管理戦略

### Context分割原則
```typescript
// 認証状態
const AuthProvider: React.FC = ({ children }) => {
  // ユーザー認証情報のみ管理
};

// UI状態（一時的な状態）
const UIProvider: React.FC = ({ children }) => {
  // ダークモード、モバイルメニューなど
};

// データ取得状態
// urqlキャッシュで自動管理（追加のState管理不要）
```

### ローカル状態 vs グローバル状態
| 状態の種類 | 管理方法 | 例 |
|------------|----------|-----|
| **UI状態** | `useState` / `useReducer` | モーダル開閉、フォーム入力 |
| **認証状態** | `AuthContext` | ユーザー情報、ログイン状態 |
| **サーバー状態** | `urql` キャッシュ | API取得データ |
| **クライアント設定** | `localStorage` + `Context` | ダークモード、言語設定 |

---

## 🎨 スタイリングベストプラクティス

### Tailwind + MUI併用パターン
```typescript
// MUIコンポーネントのスタイル拡張
const StyledCard = styled(Card)(({ theme }) => ({
  // MUI themeを使用
  borderRadius: theme.spacing(2),
  boxShadow: theme.shadows[3],
  
  // Tailwindクラスと組み合わせ
  '&:hover': {
    transform: 'translateY(-2px)',
    transition: 'transform 0.2s ease-in-out',
  },
}));

// 使用例
<StyledCard className="p-4 m-2 hover:shadow-lg">
  <CardContent>
    <Typography variant="h6" className="text-gray-800 dark:text-gray-200">
      Title
    </Typography>
  </CardContent>
</StyledCard>
```

### CSS-in-JS vs Utility Classes
```typescript
// ✅ 推奨: MUIコンポーネント + Tailwind Utilities
<Button 
  variant="contained" 
  className="px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow"
>
  送信
</Button>

// ❌ 非推奨: 過度なstyledコンポーネント
const OverStyledButton = styled(Button)`
  padding: 1.5rem 2rem;
  border-radius: 0.5rem;
  /* ... 長いCSSルール */
`;
```

---

## 🧪 テスト戦略

### コンポーネントテスト
```typescript
// __tests__/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@urql/testing-utils';
import { Header } from '../components/Header';

describe('Header', () => {
  it('ログイン状態でユーザー名を表示', () => {
    const mockUser = { id: '1', name: 'テストユーザー' };
    
    render(
      <MockedProvider>
        <AuthProvider initialUser={mockUser}>
          <Header />
        </AuthProvider>
      </MockedProvider>
    );

    expect(screen.getByText('テストユーザー')).toBeInTheDocument();
  });
});
```

### GraphQLモック
```typescript
// __tests__/hooks/useArtworks.test.tsx
import { renderHook } from '@testing-library/react';
import { MockedProvider } from '@urql/testing-utils';
import { useArtworks } from '../hooks/useArtworks';

const mocks = [
  {
    request: { query: GetArtworksDocument },
    result: {
      data: {
        artworks: [
          { id: '1', title: 'Test Artwork', author: 'Test Author' }
        ]
      }
    }
  }
];

describe('useArtworks', () => {
  it('作品一覧を正常取得', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useArtworks(), {
      wrapper: ({ children }) => (
        <MockedProvider mocks={mocks}>{children}</MockedProvider>
      )
    });

    await waitForNextUpdate();
    expect(result.current.artworks).toHaveLength(1);
  });
});
```

---

## ⚡ パフォーマンス最適化

### 画像最適化
```typescript
// components/OptimizedImage.tsx
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
}) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      style={{
        objectFit: 'cover',
        borderRadius: '8px',
      }}
    />
  );
};
```

### 遅延ローディング
```typescript
// components/LazyArtworkGrid.tsx
import { Suspense, lazy } from 'react';

const ArtworkGrid = lazy(() => import('./ArtworkGrid'));

export const LazyArtworkGrid: React.FC = () => {
  return (
    <Suspense fallback={<ArtworkGridSkeleton />}>
      <ArtworkGrid />
    </Suspense>
  );
};
```

### メモ化パターン
```typescript
// hooks/useArtworks.ts
export const useArtworks = (filters: ArtworkFilters) => {
  const variables = useMemo(() => ({ filters }), [filters]);
  
  const [result] = useQuery({
    query: GetArtworksDocument,
    variables,
  });

  return useMemo(() => ({
    artworks: result.data?.artworks || [],
    loading: result.fetching,
    error: result.error,
  }), [result]);
};
```

---

## 🌐 アクセシビリティ対応

### ARIA属性とセマンティクス
```typescript
// components/SearchInput.tsx
export const SearchInput: React.FC = () => {
  const [query, setQuery] = useState('');
  const inputId = useId();

  return (
    <div role="search">
      <label htmlFor={inputId} className="sr-only">
        作品を検索
      </label>
      <TextField
        id={inputId}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="作品タイトルで検索..."
        aria-describedby={`${inputId}-help`}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon aria-hidden="true" />
            </InputAdornment>
          ),
        }}
      />
      <div id={`${inputId}-help`} className="sr-only">
        作品タイトルまたは作者名で検索できます
      </div>
    </div>
  );
};
```

### キーボードナビゲーション
```typescript
// components/ArtworkCard.tsx
export const ArtworkCard: React.FC<{ artwork: Artwork }> = ({ artwork }) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // 詳細ページへ遷移
    }
  };

  return (
    <Card
      tabIndex={0}
      role="button"
      aria-label={`作品「${artwork.title}」の詳細を見る`}
      onKeyDown={handleKeyDown}
      className="focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <CardContent>
        <Typography variant="h6">{artwork.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          {artwork.author}
        </Typography>
      </CardContent>
    </Card>
  );
};
```

---

## 🔧 開発ツール & ワークフロー

### GraphQL Code Generation
```bash
# graphql.config.yml
schema: 'src/graphql/**/*.graphql'
generates:
  src/generated/generated-graphql.ts:
    documents: 'src/graphql/**/*.graphql'
    plugins:
      - typescript
      - typescript-operations
      - typescript-urql
    config:
      withHooks: true
      scalars:
        DateTime: string
        JSON: Record<string, any>
```

### Storybook統合
```typescript
// .storybook/main.ts
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/nextjs',
};

// components/Button.stories.tsx
export default {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: { description: { component: '基本的なボタンコンポーネント' } },
  },
} as Meta;

export const Primary: Story = {
  args: {
    variant: 'contained',
    children: 'プライマリボタン',
  },
};
```

---

## 📚 関連ドキュメント

- **[バックエンド仕様](backend.md)**: GraphQL API・認証システム
- **[認証アーキテクチャ](auth-architecture-A.md)**: 認証フロー詳細
- **[デプロイメント](deployment-controls.md)**: 本番環境構築・CI/CD

---

## 🔄 今後の改善予定

### 短期目標
- [ ] **Progressive Web App (PWA)**: オフライン対応・プッシュ通知
- [ ] **Internationalization (i18n)**: 多言語対応（英語・日本語）
- [ ] **E2E Testing**: Playwright導入

### 中期目標
- [ ] **Server Components**: Next.js 13+ App Router移行
- [ ] **Real-time Features**: GraphQL Subscriptions（作品更新通知）
- [ ] **Advanced Caching**: ISR + Edge Computing

### 長期目標
- [ ] **Micro Frontend**: 機能別モジュール分割
- [ ] **Design System**: 独自コンポーネントライブラリ
- [ ] **AI Integration**: 作品推薦・自動タグ付け

---

<div align="center">

**最終更新**: 2025-09-07  
**管理者**: Frontend Team

</div>
