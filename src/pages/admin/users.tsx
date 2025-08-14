import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

// Dummy data for users
const dummyUsers = [
  {
    id: 1,
    handle_name: 'user001',
    name: '田中太郎',
    email: 'tanaka@example.com',
    role: 'USER',
    created_at: '2024-01-15T10:30:00Z',
  },
  {
    id: 2,
    handle_name: 'admin001',
    name: '佐藤花子',
    email: 'sato@example.com',
    role: 'ADMIN',
    created_at: '2024-01-10T09:00:00Z',
  },
  {
    id: 3,
    handle_name: 'user002',
    name: '鈴木次郎',
    email: 'suzuki@example.com',
    role: 'USER',
    created_at: '2024-01-20T14:45:00Z',
  },
];

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'handle_name', label: 'ハンドルネーム', minWidth: 120 },
  { id: 'name', label: '名前', minWidth: 120 },
  { id: 'email', label: 'メールアドレス', minWidth: 200 },
  { 
    id: 'role', 
    label: 'ロール', 
    minWidth: 100,
    format: (value: string) => value === 'ADMIN' ? '管理者' : 'ユーザー'
  },
  { 
    id: 'created_at', 
    label: '作成日時', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
];

export default function AdminUsers() {
  const { isAdminLoggedIn } = useAdminAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAdminLoggedIn) {
      router.push('/admin/login');
    }
  }, [isAdminLoggedIn, router]);

  if (!isAdminLoggedIn) {
    return null; // Will redirect
  }

  const handleView = (row: any) => {
    console.log('Viewing user:', row);
    // TODO: Implement view functionality
  };

  const handleEdit = (row: any) => {
    console.log('Editing user:', row);
    // TODO: Implement edit functionality
  };

  const handleDelete = (row: any) => {
    console.log('Deleting user:', row);
    // TODO: Implement delete functionality
  };

  return (
    <AdminLayout>
      <AdminTable
        title="ユーザー管理"
        columns={columns}
        rows={dummyUsers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}