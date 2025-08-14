import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { 
  cacheExchange,
  fetchExchange,
  createClient,
  Provider as UrqlProvider,
  ssrExchange,
 } from 'urql';
import { AppCacheProvider as MUIProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery, Backdrop, CircularProgress } from '@mui/material';
import Header from '@/components/Header';
import NextTopLoader from 'nextjs-toploader';
import createAuthExchange from '../utils/auth-exchanges';
import { persistedExchange } from '@urql/exchange-persisted';
import { AuthProvider, useAuth } from '@/contexts/AuthContexts';
import { AdminAuthProvider } from '@/contexts/AdminAuthContext';
import { PauseProvider } from '@/contexts/PauseContexts';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import useResponsive from '../hooks/useResponsive';
import Footer from '@/components/Footer';
import { ToastContainer, Bounce } from 'react-toastify';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ProfileProvider } from '@/contexts/Profile/ProfileContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface AppContentProps extends Omit<AppProps, 'router'> {
  router: NextRouter;
}

export default function App(
  { Component, pageProps: { session, ...pageProps },}: AppProps,
) {
  const theme = createTheme({
    // 端末のデザインモードに応じてサイトのデザインモードを設定
    palette: {mode: useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'},
    // 改行を反映
    components: {
      MuiCssBaseline: {styleOverrides: {body: {whiteSpace: 'pre-wrap'},}},
      MuiTextField: {defaultProps: {inputProps: {style: {fontSize: '18px',}}}},
      MuiButtonBase: {defaultProps: {disableRipple: true}},
    },
  });
  const urqlClient = createClient({
    exchanges: [
      cacheExchange,
      ...(
            process.env.NODE_ENV === "development"
        &&  process.env.npm_lifecycle_event === "graphql-codegen"
        ? [persistedExchange({
            preferGetForPersistedQueries: true,
            enableForMutation: true,
          })]
        : []
      ),
      ssrExchange({isClient: typeof window !== 'undefined'}),
      // createAuthExchange(),
      fetchExchange,
    ],
    url: '/api/graphql',
    fetchOptions: () => {
      // Add CSRF header for mutations (and harmlessly for others) using the Double Submit cookie
      const headers: Record<string, string> = {};
      if (typeof document !== 'undefined') {
        const match = (document.cookie || '').split('; ').find((c) => c.startsWith('csrfToken='));
        const csrf = match?.split('=')[1];
        if (csrf) headers['x-csrf-token'] = csrf;
      }
      return { credentials: 'include', headers };
    },
  });
  return (
    <MUIProvider>
       <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UrqlProvider value={urqlClient}>
            <AuthProvider>
              <AdminAuthProvider>
                <PauseProvider initialPaused={false}>
                  <ProfileProvider>
                    <NextTopLoader
                      color={theme.palette.mode=="dark"?"#AAAAAA":"666666"}
                      initialPosition={0.08}
                      crawlSpeed={200}
                      height={5}
                      showSpinner={false}
                    />
                    <AppContent Component={Component} pageProps={pageProps} router={useRouter()} />
                  </ProfileProvider>
                </PauseProvider>
              </AdminAuthProvider>
            </AuthProvider>
          </UrqlProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </MUIProvider>
  );
}

function AppContent({ Component, pageProps, router }: AppContentProps) {
  const { isLoggedIn, fetching } = useAuth();
  const isRootPath = router.pathname === '/';
  const {isSmallScreen, isLargeScreen} = useResponsive();
  const [authBusy, setAuthBusy] = useState<string | null>(null);
  // 初期化: リロード直後に sessionStorage から取得
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const v = sessionStorage.getItem('authBusy');
      setAuthBusy(v);
    } catch {}
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail as string | null | undefined;
      setAuthBusy(detail ?? sessionStorage.getItem('authBusy'));
    };
    window.addEventListener('authBusyChange', onChange as EventListener);
    return () => window.removeEventListener('authBusyChange', onChange as EventListener);
  }, []);

  // リロード後に遅延トーストを表示
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const key = sessionStorage.getItem('postAuthToast');
      if (key) {
        sessionStorage.removeItem('postAuthToast');
        if (key === 'login') toast.success('ログインしました。');
        if (key === 'logout') toast.success('ログアウトしました。');
      }
    } catch {}
  }, []);

  // 認証のリロード跨ぎ Busy 表示: Me が確定するまで維持し、確定後に解除
  useEffect(() => {
    if (typeof window === 'undefined') return;
    // fetching が false になれば初期化完了とみなす
    if (!fetching) {
  try { sessionStorage.removeItem('authBusy'); } catch {}
  setAuthBusy(null);
    }
  }, [fetching]);

  return (
    <>
      {(!isRootPath || isLoggedIn) && isLargeScreen && <Header />}
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        theme="colored"
        draggable
        transition={Bounce}
        style={{zIndex: 9999, ...(isSmallScreen ? {width: '100%'} : null)}}
      />
      <Component {...pageProps}/>
      <Backdrop open={!!authBusy} sx={{ zIndex: (theme) => theme.zIndex.modal + 1, color: '#fff' }}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {!isLargeScreen && <Footer />}
    </>
  );
}