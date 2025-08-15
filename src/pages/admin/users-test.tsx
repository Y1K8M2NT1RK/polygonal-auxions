import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import { 
  UserDetailModal, 
  UserEditModal, 
  UserCreateModal, 
  DeleteConfirmModal 
} from '@/components/admin/UserManagementModals';

// Test page for user management components
export default function AdminUsersTest() {
  const [modalType, setModalType] = React.useState<'view' | 'edit' | 'create' | 'delete' | null>(null);
  const [selectedUser] = React.useState(null);

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

  const mockUsers = [
    {
      id: '1',
      handle_name: 'user001',
      name: '田中太郎',
      email: 'tanaka@example.com',
      phone_number: '09012345678',
      created_at: '2024-01-15T10:30:00Z',
    },
    {
      id: '2',
      handle_name: 'user002',
      name: '鈴木花子',
      email: 'suzuki@example.com',
      phone_number: '09087654321',
      created_at: '2024-01-20T14:45:00Z',
    },
  ];

  const handleView = (row: any) => {
    console.log('Viewing user:', row);
    setModalType('view');
  };

  const handleEdit = (row: any) => {
    console.log('Editing user:', row);
    setModalType('edit');
  };

  const handleDelete = (row: any) => {
    console.log('Deleting user:', row);
    setModalType('delete');
  };

  const handleAdd = () => {
    console.log('Adding user');
    setModalType('create');
  };

  const handleCloseModal = () => {
    setModalType(null);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Search:', event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Search submitted');
  };

  const handlePageChange = (event: unknown, newPage: number) => {
    console.log('Page changed:', newPage);
  };

  const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Rows per page changed:', event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        管理者ユーザー管理 - テスト画面
      </Typography>
      
      <AdminTable
        title="ユーザー管理"
        columns={columns}
        rows={mockUsers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAdd={handleAdd}
        page={0}
        rowsPerPage={10}
        totalCount={25}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
        searchValue=""
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        loading={false}
      />

      {/* Detail Modal */}
      <UserDetailModal
        open={modalType === 'view'}
        onClose={handleCloseModal}
        user={selectedUser}
      />

      {/* Edit Modal */}
      <UserEditModal
        open={modalType === 'edit'}
        onClose={handleCloseModal}
        user={selectedUser}
        onSave={(data) => console.log('Save user:', data)}
        loading={false}
      />

      {/* Create Modal */}
      <UserCreateModal
        open={modalType === 'create'}
        onClose={handleCloseModal}
        onCreate={(data) => console.log('Create user:', data)}
        loading={false}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        open={modalType === 'delete'}
        onClose={handleCloseModal}
        onConfirm={() => console.log('Delete confirmed')}
        userName="テストユーザー"
        loading={false}
      />
    </Container>
  );
}