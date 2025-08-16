import { useState, useCallback } from 'react';
import { AdminUser, AdminUsersListResponse, AdminUserDetail, UserFormData } from '@/types/admin';
import {
  AdminUsersListDocument,
  AdminUsersListQuery,
  AdminUsersListQueryVariables,
  AdminUserDetailDocument,
  AdminUserDetailQuery,
  AdminUserDetailQueryVariables,
  useAdminCreateUserMutation,
  useAdminUpdateUserMutation,
  useAdminDeleteUserMutation,
  AdminCreateUserMutation,
  AdminCreateUserMutationVariables,
  AdminUpdateUserMutation,
  AdminUpdateUserMutationVariables,
  AdminDeleteUserMutation,
  AdminDeleteUserMutationVariables,
} from '@/generated/generated-graphql';
import { useClient } from 'urql';

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
  deleteUser: (id: string, onDeleted?: () => void) => Promise<boolean>;
}

// GraphQL は generated-graphql.ts の定義を使用

// 生成済みの Mutation を使用

export function useAdminUsers(): UseAdminUsersReturn {
  const client = useClient();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (page: number, limit: number, search?: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await client
        .query<AdminUsersListQuery, AdminUsersListQueryVariables>(
          AdminUsersListDocument,
          { page, limit, search },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (error) throw error;
      if (!data?.adminUsersList) throw new Error('No data');

  setUsers((data.adminUsersList?.users as AdminUser[]) || []);
      setTotalCount(data.adminUsersList.totalCount || 0);
      setHasNextPage(!!data.adminUsersList.hasNextPage);
      setHasPreviousPage(!!data.adminUsersList.hasPreviousPage);
    } catch (e) {
      console.error('Failed to fetch users:', e);
      setError('ユーザー一覧の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [client]);

  const refetch = useCallback(() => fetchUsers(1, 10), [fetchUsers]);

  return { users, totalCount, hasNextPage, hasPreviousPage, loading, error, fetchUsers, refetch };
}

export function useAdminUserDetail(): UseAdminUserDetailReturn {
  const client = useClient();
  const [user, setUser] = useState<AdminUserDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await client
        .query<AdminUserDetailQuery, AdminUserDetailQueryVariables>(
          AdminUserDetailDocument,
          { id },
          { requestPolicy: 'network-only' }
        )
        .toPromise();

      if (error) throw error;
  if (!data?.adminUserDetail) throw new Error('Not found');
  setUser(data.adminUserDetail as unknown as AdminUserDetail);
    } catch (e) {
      console.error('Failed to fetch user detail:', e);
      setError('ユーザー詳細の取得に失敗しました。');
    } finally {
      setLoading(false);
    }
  }, [client]);

  return { user, loading, error, fetchUser };
}

export function useAdminUserMutations(): UseAdminUserMutationsReturn {
  const client = useClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, execCreate] = useAdminCreateUserMutation();
  const [, execUpdate] = useAdminUpdateUserMutation();
  const [, execDelete] = useAdminDeleteUserMutation();

  const createUser = useCallback(async (data: UserFormData & { password: string }): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
  const variables: AdminCreateUserMutationVariables = { ...data } as any;
  const { data: resp, error: err } = await execCreate(variables);
      if (err) throw err;
      const result = resp?.adminCreateUser;
      if (!result) throw new Error('No result');
      if (result.__typename === 'ZodError') {
        setError(result.message || '入力エラーが発生しました。');
        return false;
      }
      return true;
    } catch (e) {
      console.error('Failed to create user:', e);
      setError('ユーザーの作成に失敗しました。');
      return false;
    } finally {
      setLoading(false);
    }
  }, [client]);

  const updateUser = useCallback(async (id: string, data: UserFormData): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
  const variables: AdminUpdateUserMutationVariables = { id, ...data } as any;
  const { data: resp, error: err } = await execUpdate(variables);
      if (err) throw err;
      const result = resp?.adminUpdateUser;
      if (!result) throw new Error('No result');
      if (result.__typename === 'ZodError') {
        setError(result.message || '入力エラーが発生しました。');
        return false;
      }
      return true;
    } catch (e) {
      console.error('Failed to update user:', e);
      setError('ユーザーの更新に失敗しました。');
      return false;
    } finally {
      setLoading(false);
    }
  }, [client]);

  const deleteUser = useCallback(async (id: string, onDeleted?: () => void): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
  const { data: resp, error: err } = await execDelete({ id });
      if (err) throw err;
      const result = resp?.adminDeleteUser;
      if (!result) throw new Error('No result');
      if (result.__typename === 'ZodError') {
        setError(result.message || '入力エラーが発生しました。');
        return false;
      }
      // 直後の一覧再取得を明示（caller に任せるハンドラも提供）
      try { onDeleted?.(); } catch {}
      return true;
    } catch (e) {
      console.error('Failed to delete user:', e);
      setError('ユーザーの削除に失敗しました。');
      return false;
    } finally {
      setLoading(false);
    }
  }, [client]);

  return { loading, error, createUser, updateUser, deleteUser };
}