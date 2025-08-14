import { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
} from '@mui/material';
import { useAdminAuth } from '@/contexts/AdminAuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { isAdminLoggedIn, handleAdminLogin, formErrors } = useAdminAuth();
  const router = useRouter();

  // Redirect to admin dashboard if already logged in as admin
  useEffect(() => {
    if (isAdminLoggedIn) {
      router.push('/admin/dashboard');
    }
  }, [isAdminLoggedIn, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleAdminLogin(email, password);
    } finally {
      setLoading(false);
    }
  };

  if (isAdminLoggedIn) {
    return null; // Will redirect
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 400,
          }}
        >
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            管理者ログイン
          </Typography>
          
          {formErrors.length > 0 && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {formErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              required
              autoComplete="email"
            />
            
            <TextField
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              required
              autoComplete="current-password"
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{ mt: 3, mb: 2 }}
            >
              {loading ? 'ログイン中...' : 'ログイン'}
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}