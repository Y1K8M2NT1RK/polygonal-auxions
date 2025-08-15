import { useState, useCallback } from 'react';
import { AdminUser, AdminUsersListResponse, AdminUserDetail, UserFormData } from '@/types/admin';

// Placeholder hook for admin user management
// This will be replaced with actual urql queries once GraphQL codegen works

interface UseAdminUsersReturn {
  users: AdminUser[];
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  loading: boolean;
  error: string | null;
  fetchUsers: (page: number, limit: number, search?: string) => Promise<void>;
  refetch: () => Promise<void>;
}

interface UseAdminUserDetailReturn {
  user: AdminUserDetail | null;
  loading: boolean;
  error: string | null;
  fetchUser: (id: string) => Promise<void>;
}

interface UseAdminUserMutationsReturn {
  loading: boolean;
  error: string | null;
  createUser: (data: UserFormData & { password: string }) => Promise<boolean>;
  updateUser: (id: string, data: UserFormData) => Promise<boolean>;
  deleteUser: (id: string) => Promise<boolean>;
}

// Mock data for development
const mockUsers: AdminUser[] = [
  {
    id: '1',
    handle_name: 'user001',
    name: '田中太郎',
    name_kana: 'たなかたろう',
    email: 'tanaka@example.com',
    phone_number: '09012345678',
    address: '東京都渋谷区',
    introduction: 'よろしくお願いします。',
    birthday: '1990-01-15T00:00:00.000Z',
    role: 'USER',
    created_at: '2024-01-15T10:30:00Z',
    updated_at: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    handle_name: 'user002',
    name: '鈴木花子',
    name_kana: 'すずきはなこ',
    email: 'suzuki@example.com',
    phone_number: '09087654321',
    address: '大阪府大阪市',
    introduction: 'アートが好きです。',
    birthday: '1985-03-22T00:00:00.000Z',
    role: 'USER',
    created_at: '2024-01-20T14:45:00Z',
    updated_at: '2024-01-20T14:45:00Z',
  },
  {
    id: '3',
    handle_name: 'user003',
    name: '佐藤次郎',
    name_kana: 'さとうじろう',
    email: 'sato@example.com',
    phone_number: '09055556666',
    address: '福岡県福岡市',
    introduction: '写真を撮るのが趣味です。',
    birthday: '1992-07-10T00:00:00.000Z',
    role: 'USER',
    created_at: '2024-02-01T09:15:00Z',
    updated_at: '2024-02-01T09:15:00Z',
  },
];

const mockUserDetail: AdminUserDetail = {
  ...mockUsers[0],
  user_files: [
    {
      purpose_id: '1',
      file_path: '/images/avatar1.jpg',
    },
  ],
  artworks: [
    {
      slug_id: 'artwork1',
      title: '美しい風景',
      created_at: '2024-01-20T10:00:00Z',
    },
    {
      slug_id: 'artwork2',
      title: '街の夕暮れ',
      created_at: '2024-01-18T15:30:00Z',
    },
  ],
  comments: [
    {
      body: 'とても素晴らしい作品ですね！',
      created_at: '2024-01-22T12:00:00Z',
      artwork: {
        slug_id: 'other-artwork',
        title: '他の作品',
      },
    },
  ],
};

let mockTotalUsers = 25; // For pagination simulation

export function useAdminUsers(): UseAdminUsersReturn {
  const [users, setUsers] = useState<AdminUser[]>(mockUsers);
  const [totalCount, setTotalCount] = useState(mockTotalUsers);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page: number, limit: number, search?: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      let filteredUsers = [...mockUsers];
      
      // Apply search filter
      if (search && search.trim()) {
        const searchTerm = search.toLowerCase();
        filteredUsers = filteredUsers.filter(user => 
          user.handle_name.toLowerCase().includes(searchTerm) ||
          user.name.toLowerCase().includes(searchTerm) ||
          user.email.toLowerCase().includes(searchTerm)
        );
      }

      // Simulate pagination
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

      setUsers(paginatedUsers);
      setTotalCount(filteredUsers.length);
      setHasNextPage(endIndex < filteredUsers.length);
      setHasPreviousPage(page > 1);

    } catch (err) {
      setError('ユーザー一覧の取得に失敗しました。');
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchUsers(1, 10);
  }, [fetchUsers]);

  return {
    users,
    totalCount,
    hasNextPage,
    hasPreviousPage,
    loading,
    error,
    fetchUsers,
    refetch,
  };
}

export function useAdminUserDetail(): UseAdminUserDetailReturn {
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Find user in mock data
      const foundUser = mockUsers.find(u => u.id === id);
      if (foundUser) {
        setUser({ ...mockUserDetail, ...foundUser });
      } else {
        setError('ユーザーが見つかりませんでした。');
      }

    } catch (err) {
      setError('ユーザー詳細の取得に失敗しました。');
      console.error('Failed to fetch user detail:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    loading,
    error,
    fetchUser,
  };
}

export function useAdminUserMutations(): UseAdminUserMutationsReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createUser = useCallback(async (data: UserFormData & { password: string }): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));

      // Check for existing handle_name or email in mock data
      const existingUser = mockUsers.find(u => 
        u.handle_name === data.handle_name || u.email === data.email
      );

      if (existingUser) {
        setError('このハンドルネームまたはメールアドレスは既に使用されています。');
        return false;
      }

      // Simulate successful creation
      const newUser: AdminUser = {
        id: String(mockUsers.length + 1),
        handle_name: data.handle_name,
        name: data.name,
        name_kana: data.name_kana || '',
        email: data.email,
        phone_number: data.phone_number || '',
        address: data.address || '',
        introduction: data.introduction || '',
        birthday: data.birthday || '',
        role: 'USER',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      mockUsers.unshift(newUser);
      mockTotalUsers++;
      
      return true;

    } catch (err) {
      setError('ユーザーの作成に失敗しました。');
      console.error('Failed to create user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateUser = useCallback(async (id: string, data: UserFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 600));

      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        setError('ユーザーが見つかりませんでした。');
        return false;
      }

      // Check for existing handle_name or email (excluding current user)
      if (data.handle_name || data.email) {
        const existingUser = mockUsers.find(u => 
          u.id !== id && (
            (data.handle_name && u.handle_name === data.handle_name) ||
            (data.email && u.email === data.email)
          )
        );

        if (existingUser) {
          setError('このハンドルネームまたはメールアドレスは既に使用されています。');
          return false;
        }
      }

      // Update user data
      const updatedUser = {
        ...mockUsers[userIndex],
        ...data,
        updated_at: new Date().toISOString(),
      };

      mockUsers[userIndex] = updatedUser;
      
      return true;

    } catch (err) {
      setError('ユーザーの更新に失敗しました。');
      console.error('Failed to update user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteUser = useCallback(async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const userIndex = mockUsers.findIndex(u => u.id === id);
      if (userIndex === -1) {
        setError('ユーザーが見つかりませんでした。');
        return false;
      }

      mockUsers.splice(userIndex, 1);
      mockTotalUsers--;
      
      return true;

    } catch (err) {
      setError('ユーザーの削除に失敗しました。');
      console.error('Failed to delete user:', err);
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
  };
}