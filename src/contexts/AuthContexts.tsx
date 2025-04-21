import { FC, createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useQuery, useMutation } from 'urql';
import { MeDocument, LoginDocument, RefreshDocument, LogoutDocument, User } from '@/generated/generated-graphql';
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
      if (typeof window !== 'undefined') {
        document.cookie = `token=${result.data.login.data.accessToken}; HttpOnly; Secure; Path=/; SameSite=Strict`;
        document.cookie = `refreshToken=${result.data.login.data.refreshToken}; HttpOnly; Secure; Path=/; SameSite=Strict`;
      }
      setIsLoggedIn(true);
      reexecuteQuery({ requestPolicy: 'network-only' });
      toast.success('ログインできました。');
    } else {
      const gqlErrors: string[] = result.error?.graphQLErrors[0].extensions.messages as string[];
      setFormErrors(gqlErrors);
      toast.error('ログインできません。入力内容をお確かめください。');
    }
  }, [login, reexecuteQuery]);

  const handleLogout = useCallback(async () => {
    const result = await logout({});
    if (result.data?.logout) {
      if (typeof window !== 'undefined') {
        document.cookie = 'token=; Max-Age=0; path=/; secure; HttpOnly; SameSite=Strict';
        document.cookie = 'refreshToken=; Max-Age=0; path=/; secure; HttpOnly; SameSite=Strict';
      }
      setIsLoggedIn(false);
      setAuth(null);
      reexecuteQuery({ requestPolicy: 'network-only' });
      toast.success('ログアウトしました。');
    } else {
      toast.error('ログアウトに失敗しました。');
    }
  }, [logout, reexecuteQuery]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        await refreshToken({});
        reexecuteQuery({ requestPolicy: 'network-only' });
      } catch (error) {
        console.error('Failed to refresh token:', error);
      }
    }, 14 * 60 * 1000); // 14分ごとにリフレッシュ

    return () => clearInterval(interval);
  }, [refreshToken, reexecuteQuery]);

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