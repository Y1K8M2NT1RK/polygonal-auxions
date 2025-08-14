import { FC, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { User } from '@/generated/generated-graphql';

type AdminAuthContextType = {
  isAdminLoggedIn: boolean;
  adminUser: User | null;
  fetching: boolean;
  handleAdminLogin: (email: string, password: string) => Promise<void>;
  handleAdminLogout: () => Promise<void>;
  formErrors: string[];
};

type AdminAuthProviderProps = { children: ReactNode; };

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: FC<AdminAuthProviderProps> = ({ children }) => {
  const { isLoggedIn, user, fetching, handleLogin, handleLogout, formErrors } = useAuth();
  
  // Check if user has admin role in the database
  // Fallback to temporary check for email/handle containing 'admin' for existing users
  const isAdminLoggedIn = Boolean(
    isLoggedIn && 
    user && 
    (
      // Check role field if available in user object (after schema update)
      (user as any).role === 'ADMIN' || 
      (user as any).role === 'MODERATOR' ||
      // Temporary fallback for existing users without role - broad criteria for testing
      user.email?.toLowerCase().includes('admin') || 
      user.handle_name?.toLowerCase() === 'admin' ||
      user.email === 'admin@example.com' ||
      user.handle_name === 'admin'
    )
  );
  
  // Debug logging for development
  if (process.env.NODE_ENV === 'development' && isLoggedIn && user) {
    console.log('Admin Auth Debug:', {
      isLoggedIn,
      userEmail: user.email,
      userHandle: user.handle_name,
      userRole: (user as any).role,
      isAdminLoggedIn
    });
  }
  
  const adminUser = isAdminLoggedIn ? user : null;

  const handleAdminLogin = async (email: string, password: string) => {
    await handleLogin(email, password);
    // Additional admin-specific login logic can be added here if needed
  };

  const handleAdminLogout = async () => {
    await handleLogout();
    // Additional admin-specific logout logic can be added here if needed
  };

  return (
    <AdminAuthContext.Provider value={{
      isAdminLoggedIn,
      adminUser,
      fetching,
      handleAdminLogin,
      handleAdminLogout,
      formErrors
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};