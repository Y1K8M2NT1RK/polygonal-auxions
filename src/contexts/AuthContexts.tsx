import { FC, createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { useQuery, useMutation } from 'urql';
import { MeDocument, LoginDocument, LogoutDocument, User } from '@/generated/generated-graphql';
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
  const [{ data, fetching }, reexecuteQuery] = useQuery({ query: MeDocument });
  // Remove redundant eager profile query: pages fetch profiles on demand

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
    if (typeof window !== 'undefined') {
      try { sessionStorage.setItem('authBusy', 'login'); } catch {}
  try { window.dispatchEvent(new CustomEvent('authBusyChange', { detail: 'login' })); } catch {}
    }
    const result = await login({ email, password });
    if (result.data?.login.__typename === 'MutationLoginSuccess') {
      setFormErrors([]);
      if (typeof window !== 'undefined') {
        try { sessionStorage.setItem('postAuthToast', 'login'); } catch {}
        window.location.reload();
      }
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
      // 失敗時は Busy を解除
      if (typeof window !== 'undefined') {
        try { sessionStorage.removeItem('authBusy'); } catch {}
  try { window.dispatchEvent(new CustomEvent('authBusyChange', { detail: null as any })); } catch {}
      }
    }
  }, [login]);

  const handleLogout = useCallback(async () => {
    if (typeof window !== 'undefined') {
      try { sessionStorage.setItem('authBusy', 'logout'); } catch {}
  try { window.dispatchEvent(new CustomEvent('authBusyChange', { detail: 'logout' })); } catch {}
    }
    const result = await logout({});
    if (result.data?.logout) {
      setAuth(null);
      setIsLoggedIn(false);
      if (typeof window !== 'undefined') {
        try { sessionStorage.setItem('postAuthToast', 'logout'); } catch {}
        window.location.reload();
      }
    } else {
      toast.error('ログアウトに失敗しました。');
      if (typeof window !== 'undefined') {
        try { sessionStorage.removeItem('authBusy'); } catch {}
  try { window.dispatchEvent(new CustomEvent('authBusyChange', { detail: null as any })); } catch {}
      }
    }
  }, [logout]);

  // 認証方式A (Cookie セッション純化) 前提: クライアント側定期 refresh は不要
  // サーバ側の rolling セッション / 期限切れ時 401 応答で十分
  // 旧実装: 14分周期で refresh ミューテーションを実行
  // 保守参考用に残す: コメント解除で再度利用可能
  // refresh トークン廃止: 定期 refresh 処理は不要になりました

  useEffect(() => {
    if (isLoggedIn) {
      reexecuteQuery({ requestPolicy: 'network-only' });
    }
  }, [isLoggedIn, reexecuteQuery]);

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