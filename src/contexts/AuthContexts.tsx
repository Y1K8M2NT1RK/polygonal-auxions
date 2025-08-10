import { FC, createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useQuery, useMutation } from 'urql';
import { MeDocument, LoginDocument, RefreshDocument, LogoutDocument, UserProfileDocument, User } from '@/generated/generated-graphql';
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

  const [, login] = useMutation(LoginDocument);
  const [, refreshToken] = useMutation(RefreshDocument);
  const [, logout] = useMutation(LogoutDocument);

  const handleLogin = useCallback(async (email: string, password: string) => {
    const result = await login({ email, password });
    if (result.data?.login.__typename === 'MutationLoginSuccess') {
      // Cookie はサーバー側 (cookieModule.setCookie) が HttpOnly 属性付きで付与するため
      // クライアントでの document.cookie 設定は不要かつ HttpOnly は付与不能。
      if (typeof window !== 'undefined') window.location.reload();
    } else {
      const gqlErrors: string[] = result.error?.graphQLErrors[0]?.extensions?.messages as string[] || [];
      setFormErrors(gqlErrors);
      toast.error('ログインできません。入力内容をお確かめください。');
    }
  }, [login]);

  const handleLogout = useCallback(async () => {
    const result = await logout({});
    if (result.data?.logout) {
      // サーバーが Set-Cookie で削除済み。クライアント側での手動削除は不要。
      if (typeof window !== 'undefined') window.location.reload();
    } else {
      toast.error('ログアウトに失敗しました。');
    }
  }, [logout]);

  // 認証方式A (Cookie セッション純化) 前提: クライアント側定期 refresh は不要
  // サーバ側の rolling セッション / 期限切れ時 401 応答で十分
  // 旧実装: 14分周期で refresh ミューテーションを実行
  // 保守参考用に残す: コメント解除で再度利用可能
  // useEffect(() => {
  //   const interval = setInterval(async () => {
  //     try {
  //       await refreshToken({});
  //       reexecuteQuery({ requestPolicy: 'network-only' });
  //     } catch (error) {
  //       console.error('Failed to refresh token:', error);
  //     }
  //   }, 14 * 60 * 1000);
  //   return () => clearInterval(interval);
  // }, [refreshToken, reexecuteQuery, reExecuteProfile]);

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