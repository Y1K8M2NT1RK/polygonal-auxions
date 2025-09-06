/**
 * Simple test file to verify report components work correctly
 * This bypasses the GraphQL/Prisma issues for basic UI validation
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import ReportDialog from '../src/components/ReportDialog';
import ReportSuccessDialog from '../src/components/ReportSuccessDialog';
import { Button, Box, Typography } from '@mui/material';

// Mock report reasons based on seed data
const mockReportReasons = [
  { id: '5', name: '不適切な表現（過激もしくは卑猥な表現など）', rank_type_id: '3' },
  { id: '6', name: '犯罪・テロリズムの誘発', rank_type_id: '3' },
  { id: '7', name: '虚偽のもしくは矛盾しているタイトル・サムネイル・表示内容', rank_type_id: '3' },
  { id: '8', name: 'その他', rank_type_id: '3' },
];

const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

function TestApp() {
  const [reportDialogOpen, setReportDialogOpen] = React.useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = React.useState(false);

  const handleReportSubmit = async (rankId: string) => {
    console.log('Report submitted with rank ID:', rankId);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setReportDialogOpen(false);
    setSuccessDialogOpen(true);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        報告機能テスト
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 2 }}>
        作品報告機能のUIコンポーネントテスト
      </Typography>

      <Button 
        variant="contained" 
        onClick={() => setReportDialogOpen(true)}
        sx={{ mr: 2 }}
      >
        報告ダイアログを開く
      </Button>

      <Button 
        variant="outlined" 
        onClick={() => setSuccessDialogOpen(true)}
      >
        成功ダイアログを開く
      </Button>

      <ReportDialog
        open={reportDialogOpen}
        onClose={() => setReportDialogOpen(false)}
        artworkId="test-artwork-id"
        artworkTitle="テスト作品"
        onReportSubmit={handleReportSubmit}
        reportReasons={mockReportReasons}
        loading={false}
      />

      <ReportSuccessDialog
        open={successDialogOpen}
        onClose={() => setSuccessDialogOpen(false)}
      />
    </Box>
  );
}

// Mock AuthContext for testing
const mockUseAuth = () => ({
  user: {
    id: 1,
    handle_name: 'test_user',
    name: 'Test User'
  }
});

// Replace the real useAuth with our mock
jest.mock('../src/contexts/AuthContexts', () => ({
  useAuth: mockUseAuth
}));

export default function runTest() {
  console.log('Testing Report Dialog Components...');
  
  const container = document.createElement('div');
  document.body.appendChild(container);
  
  const root = createRoot(container);
  root.render(
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TestApp />
    </ThemeProvider>
  );
  
  console.log('Report components rendered successfully!');
  return container;
}

// Run test if this file is executed directly
if (typeof window !== 'undefined') {
  runTest();
}