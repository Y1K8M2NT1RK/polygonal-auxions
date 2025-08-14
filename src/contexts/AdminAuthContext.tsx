import { FC, createContext, useContext, ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { User } from '@/generated/generated-graphql';

// Note: This assumes UserRole enum exists in the User type after Prisma migration
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
  
  // Temporary admin check - in production, this should check a role field in the database
  // For now, we'll check if the user's email contains 'admin' or if their handle name is 'admin'
  const isAdminLoggedIn = Boolean(
    isLoggedIn && 
    user && 
    (user.email?.includes('admin') || user.handle_name === 'admin')
  );
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