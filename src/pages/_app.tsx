import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { 
  cacheExchange,
  fetchExchange,
  createClient,
  Provider as UrqlProvider,
 } from 'urql';
import { AppCacheProvider as MUIProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import Header from '@/pages/components/Header';
import NextTopLoader from 'nextjs-toploader';
import createAuthExchange from './utils/auth-exchanges';
import { persistedExchange } from '@urql/exchange-persisted';
import { AuthProvider, useAuth } from '@/contexts/AuthContexts';
import { PauseProvider } from '@/contexts/PauseContexts';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import useResponsive from './hooks/useResponsive';
import Footer from './components/Footer';

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
      MuiCssBaseline: {styleOverrides: {body: {whiteSpace: 'pre-wrap'}}},
      MuiButtonBase: {defaultProps: {disableRipple: true}},
    },
  });
  const urqlClient = createClient({
    exchanges: [
      cacheExchange,
      persistedExchange({
        preferGetForPersistedQueries: true,
        enableForMutation: true,
      }),
      createAuthExchange(),
      fetchExchange,
    ],
    url: '/api/graphql',
  });
  return (
    <MUIProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UrqlProvider value={urqlClient}>
          <AuthProvider>
            <PauseProvider initialPaused={false}>
              <NextTopLoader
                color={theme.palette.mode=="dark"?"#AAAAAA":"666666"}
                initialPosition={0.08}
                crawlSpeed={200}
                height={5}
                showSpinner={false}
              />
              <AppContent Component={Component} pageProps={pageProps} router={useRouter()} />
            </PauseProvider>
          </AuthProvider>
        </UrqlProvider>
      </ThemeProvider>
    </MUIProvider>
  );
}

function AppContent({ Component, pageProps, router }: AppContentProps) {
  const { isLoggedIn } = useAuth();
  const isRootPath = router.pathname === '/';
  const { isLargeScreen } = useResponsive();

  return (
    <>
      {(!isRootPath || isLoggedIn) && isLargeScreen && <Header />}
      <Component {...pageProps}/>
      {!isLargeScreen && <Footer />}
    </>
  );
}