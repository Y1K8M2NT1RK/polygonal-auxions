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
      // Cookies are set server-side, just update state and refetch user data
      setFormErrors([]);
      reexecuteQuery({ requestPolicy: 'network-only' });
      toast.success('ログインしました。');
    } else {
      const gqlErrors: string[] = result.error?.graphQLErrors[0]?.extensions?.messages as string[] || ['ログインに失敗しました。'];
      setFormErrors(gqlErrors);
      toast.error('ログインできません。入力内容をお確かめください。');
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
  }, [refreshToken, reexecuteQuery, reExecuteProfile]);

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