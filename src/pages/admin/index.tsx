import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { CircularProgress, Box } from '@mui/material';

export default function AdminIndex() {
  const { isAdminLoggedIn, fetching } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (fetching) return; // Wait for auth check to complete
    
    if (isAdminLoggedIn) {
      router.push('/admin/dashboard');
    } else {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, fetching, router]);

  // Show loading while redirecting
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