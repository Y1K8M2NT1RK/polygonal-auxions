import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { CircularProgress, Box } from '@mui/material';

interface AdminRouteGuardProps {
  children: React.ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { isAdminLoggedIn, fetching } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    // 初期化未完了やルーター未準備、ログインページ上では何もしない
    if (fetching || !router.isReady || router.pathname === '/admin/login') return;

    // 未ログイン（管理者権限なし）の場合は intended URL を付けてログインへ
    if (!isAdminLoggedIn) {
      const returnTo = encodeURIComponent(router.asPath);
      router.replace(`/admin/login?returnTo=${returnTo}`);
    }
  }, [isAdminLoggedIn, fetching, router]);

  // Show loading spinner while checking authentication
  if (fetching) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Redirect中インジケータ
  if (!isAdminLoggedIn && router.pathname !== '/admin/login') {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}