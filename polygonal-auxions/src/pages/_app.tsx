import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { cacheExchange, fetchExchange, createClient, Provider as UrqlProvider } from 'urql';
import { AppCacheProvider as MUIProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { SessionProvider } from 'next-auth/react';
import { CssBaseline, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import Header from '@/pages/components/Header';
import NextTopLoader from 'nextjs-toploader';

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  // 端末のデザインモードに応じてサイトのデザインモードを設定
  const theme = createTheme({
    palette: {mode: useMediaQuery('(prefers-color-scheme: dark)') ? 'dark' : 'light'},
  });
  const urqlClient = createClient({
    exchanges: [cacheExchange, fetchExchange],
    url: 'http://localhost:3001/api/graphql',
  });
  return (
    <MUIProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <UrqlProvider value={urqlClient}>
          <SessionProvider session={session}>
            <NextTopLoader
              color={theme.palette.mode=="dark"?"#AAAAAA":"666666"}
              initialPosition={0.08}
              crawlSpeed={200}
              height={5}
              showSpinner={false}
            />
            <Header />
            <Component {...pageProps} />
          </SessionProvider>
        </UrqlProvider>
      </ThemeProvider>
    </MUIProvider>
  );
}