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
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import Header from '@/components/Header';
import NextTopLoader from 'nextjs-toploader';
import createAuthExchange from '../utils/auth-exchanges';
import { persistedExchange } from '@urql/exchange-persisted';
import { AuthProvider, useAuth } from '@/contexts/AuthContexts';
import { PauseProvider } from '@/contexts/PauseContexts';
import { useRouter } from 'next/router';
import type { NextRouter } from 'next/router';
import useResponsive from '../hooks/useResponsive';
import Footer from '@/components/Footer';
import { ToastContainer, Bounce } from 'react-toastify';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ProfileProvider } from '@/contexts/Profile/ProfileContext';

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
      persistedExchange({
        preferGetForPersistedQueries: true,
        enableForMutation: true,
      }),
      ssrExchange({isClient: typeof window !== 'undefined'}),
      createAuthExchange(),
      fetchExchange,
    ],
    url: '/api/graphql',
    fetchOptions: {
      credentials: 'include',
    },
  });
  return (
    <MUIProvider>
       <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UrqlProvider value={urqlClient}>
            <AuthProvider>
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
            </AuthProvider>
          </UrqlProvider>
        </ThemeProvider>
      </LocalizationProvider>
    </MUIProvider>
  );
}

function AppContent({ Component, pageProps, router }: AppContentProps) {
  const { isLoggedIn } = useAuth();
  const isRootPath = router.pathname === '/';
  const {isSmallScreen, isLargeScreen} = useResponsive();

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
      {!isLargeScreen && <Footer />}
    </>
  );
}