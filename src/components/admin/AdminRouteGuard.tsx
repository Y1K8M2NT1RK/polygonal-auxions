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
    // Don't redirect if we're still loading or already on login page
    if (fetching || router.pathname === '/admin/login') {
      return;
    }

    // Redirect to login if not admin
    if (!isAdminLoggedIn) {
      router.push('/admin/login');
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

  // Show nothing while redirecting
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