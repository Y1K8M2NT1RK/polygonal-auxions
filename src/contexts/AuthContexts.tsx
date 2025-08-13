import { FC, createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useQuery, useMutation } from 'urql';
import { MeDocument, LoginDocument, LogoutDocument, UserProfileDocument, User } from '@/generated/generated-graphql';
import { toast } from 'react-toastify';

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  fetching: boolean;
  handleLogin: (email: string, password: string) => Promise<void>;
  handleLogout: () => Promise<void>;
  formErrors: string[];
};

type AuthProviderProps = { children: ReactNode; };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<AuthProviderProps> = ( {children} ) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [auth, setAuth] = useState<User | null>(null);
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [{ data, fetching }, reexecuteQuery] = useQuery({query: MeDocument});
  const [reExecuteProfile] = useQuery({
    query: UserProfileDocument,
    variables: { handle_name: data?.me?.handle_name || '' },
    requestPolicy: 'network-only'
  });

  useEffect(() => {
    setIsLoggedIn(!!data?.me);
    setAuth(data?.me || null);
  }, [data]);

  // Ensure CSRF cookie exists on first load (idempotent)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('/api/csrf', { credentials: 'include' }).catch(() => {});
    }
  }, []);

  const [, login] = useMutation(LoginDocument);
  const [, logout] = useMutation(LogoutDocument);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await login({ email, password });
    if (result.data?.login.__typename === 'MutationLoginSuccess') {
      // Cookies are set server-side, just update state and refetch user data
      setFormErrors([]);
      reexecuteQuery({ requestPolicy: 'network-only' });
      toast.success('ログインしました。');
    } else {
      const firstErr = result.error?.graphQLErrors?.[0];
      const code = firstErr?.extensions?.code as string | undefined;
      if (code === 'CSRF_INVALID') {
        const msg = 'セッションが失効しました。ページを再読み込みしてから再度お試しください。';
        setFormErrors([msg]);
        toast.error(msg);
            // 自動リロードは行わない（ユーザー操作に委ねる）
      } else {
        const gqlErrors: string[] = (firstErr?.extensions?.messages as string[]) || ['ログインに失敗しました。'];
        setFormErrors(gqlErrors);
        toast.error('ログインできません。入力内容をお確かめください。');
      }
    }
  }, [login, reexecuteQuery]);

  const handleLogout = useCallback(async () => {
    const result = await logout({});
    if (result.data?.logout) {
      // Cookies are cleared server-side, just update state
      setAuth(null);
      setIsLoggedIn(false);
      reexecuteQuery({ requestPolicy: 'network-only' });
      toast.success('ログアウトしました。');
    } else {
      toast.error('ログアウトに失敗しました。');
    }
  }, [logout, reexecuteQuery]);

  // 認証方式A (Cookie セッション純化) 前提: クライアント側定期 refresh は不要
  // サーバ側の rolling セッション / 期限切れ時 401 応答で十分
  // 旧実装: 14分周期で refresh ミューテーションを実行
  // 保守参考用に残す: コメント解除で再度利用可能
  // refresh トークン廃止: 定期 refresh 処理は不要になりました

  useEffect(() => {
    if (isLoggedIn) {
      reexecuteQuery({ requestPolicy: 'network-only' });
    }
  }, [isLoggedIn, reexecuteQuery, reExecuteProfile]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user: auth, fetching, handleLogin, handleLogout, formErrors }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};