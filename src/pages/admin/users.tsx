import { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import { 
  UserDetailModal, 
  UserEditModal, 
  UserCreateModal, 
  DeleteConfirmModal 
} from '@/components/admin/UserManagementModals';
import { useAdminUsers, useAdminUserDetail, useAdminUserMutations } from '@/hooks/useAdminUsers';
import { AdminUser, UserFormData } from '@/types/admin';

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'handle_name', label: 'ハンドルネーム', minWidth: 120 },
  { id: 'name', label: '名前', minWidth: 120 },
  { id: 'email', label: 'メールアドレス', minWidth: 200 },
  { id: 'phone_number', label: '電話番号', minWidth: 120 },
  { 
    id: 'created_at', 
    label: '作成日時', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
];

type ModalType = 'view' | 'edit' | 'create' | 'delete' | null;

export default function AdminUsers() {
  // State for pagination and search
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // State for modals
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // State for notifications
  const [notification, setNotification] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
  }>({
    open: false,
    message: '',
    severity: 'success',
  });

  // Hooks
  const { 
    users, 
    totalCount, 
    hasNextPage, 
    hasPreviousPage, 
    loading: usersLoading, 
    error: usersError,
    fetchUsers 
  } = useAdminUsers();

  const { 
    user: detailUser, 
    loading: detailLoading, 
    fetchUser 
  } = useAdminUserDetail();

  const { 
    loading: mutationLoading, 
    error: mutationError,
    createUser, 
    updateUser, 
    deleteUser 
  } = useAdminUserMutations();

  // Load initial data
  useEffect(() => {
    fetchUsers(page + 1, rowsPerPage, searchTerm);
  }, [page, rowsPerPage, searchTerm, fetchUsers]);

  // Handlers for pagination
  const handlePageChange = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handlers for search
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchTerm(searchValue);
    setPage(0);
  };

  // Modal handlers
  const handleView = async (row: AdminUser) => {
    setSelectedUser(row);
    setModalType('view');
    await fetchUser(row.id);
  };

  const handleEdit = (row: AdminUser) => {
    setSelectedUser(row);
    setModalType('edit');
  };

  const handleDelete = (row: AdminUser) => {
    setSelectedUser(row);
    setModalType('delete');
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setModalType('create');
  };

  const handleCloseModal = () => {
    setModalType(null);
    setSelectedUser(null);
  };

  // CRUD operations
  const handleCreateUser = async (data: UserFormData & { password: string }) => {
    const success = await createUser(data);
    if (success) {
      showNotification('ユーザーが正常に作成されました。', 'success');
      handleCloseModal();
      // Refresh the list
      fetchUsers(page + 1, rowsPerPage, searchTerm);
    } else if (mutationError) {
      showNotification(mutationError, 'error');
    }
  };

  const handleUpdateUser = async (data: UserFormData) => {
    if (!selectedUser) return;
    
    const success = await updateUser(selectedUser.id, data);
    if (success) {
      showNotification('ユーザーが正常に更新されました。', 'success');
      handleCloseModal();
      // Refresh the list
      fetchUsers(page + 1, rowsPerPage, searchTerm);
    } else if (mutationError) {
      showNotification(mutationError, 'error');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    const success = await deleteUser(selectedUser.id, () => {
      // 直後にネットワーク経由で一覧を再取得
      const newTotalCount = totalCount - 1;
      const maxPage = Math.ceil(Math.max(0, newTotalCount) / rowsPerPage) - 1;
      const newPage = Math.min(page, Math.max(0, maxPage));
      setPage(newPage);
      fetchUsers(newPage + 1, rowsPerPage, searchTerm);
    });
    if (success) {
      showNotification('ユーザーが正常に削除されました。', 'success');
      handleCloseModal();
    } else if (mutationError) {
      showNotification(mutationError, 'error');
    }
  };

  // Notification helper
  const showNotification = (message: string, severity: 'success' | 'error' | 'warning' | 'info') => {
    setNotification({ open: true, message, severity });
  };

  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, open: false }));
  };

  // Show error if users failed to load
  useEffect(() => {
    if (usersError) {
      showNotification(usersError, 'error');
    }
  }, [usersError]);

  return (
    <AdminLayout>
      <AdminTable
        title="ユーザー管理"
        columns={columns}
        rows={users}
        onView={(row) => handleView(row as AdminUser)}
        onEdit={(row) => handleEdit(row as AdminUser)}
        onDelete={(row) => handleDelete(row as AdminUser)}
        onAdd={handleAdd}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={totalCount}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        loading={usersLoading}
      />

      {/* Detail Modal */}
      <UserDetailModal
        open={modalType === 'view'}
        onClose={handleCloseModal}
        user={detailUser}
      />

      {/* Edit Modal */}
      <UserEditModal
        open={modalType === 'edit'}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={handleUpdateUser}
        loading={mutationLoading}
      />

      {/* Create Modal */}
      <UserCreateModal
        open={modalType === 'create'}
        onClose={handleCloseModal}
        onCreate={handleCreateUser}
        loading={mutationLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={modalType === 'delete'}
        onClose={handleCloseModal}
        onConfirm={handleDeleteUser}
        userName={selectedUser?.name || ''}
        loading={mutationLoading}
      />

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.severity}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </AdminLayout>
  );
}