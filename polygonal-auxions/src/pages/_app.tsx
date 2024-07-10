import '@/app/globals.css';
import type { AppProps } from 'next/app';
import { cacheExchange, fetchExchange, createClient, Provider as UrqlProvider } from 'urql';
import { AppCacheProvider as MUIProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from '@/pages/components/Header';
import NextTopLoader from 'nextjs-toploader';

// ダークモードの設定
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  const urqlClient = createClient({
    exchanges: [cacheExchange, fetchExchange],
    url: 'http://localhost:3001/api/graphql',
  });
  return (
    <MUIProvider>
      <ThemeProvider theme={darkTheme}>
        <UrqlProvider value={urqlClient}>
          <SessionProvider session={session}>
            <NextTopLoader
              color="#AAAAAA"
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