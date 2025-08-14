import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

// Dummy data for artworks
const dummyArtworks = [
  {
    id: 1,
    title: '美しい風景',
    user_name: '田中太郎',
    likes: 45,
    comments: 12,
    created_at: '2024-02-01T10:30:00Z',
    deleted: false,
  },
  {
    id: 2,
    title: '抽象アート',
    user_name: '佐藤花子',
    likes: 23,
    comments: 8,
    created_at: '2024-01-28T15:20:00Z',
    deleted: false,
  },
  {
    id: 3,
    title: 'デジタル作品',
    user_name: '鈴木次郎',
    likes: 67,
    comments: 19,
    created_at: '2024-02-03T11:45:00Z',
    deleted: true,
  },
];

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'タイトル', minWidth: 200 },
  { id: 'user_name', label: '作成者', minWidth: 120 },
  { id: 'likes', label: 'いいね数', minWidth: 80, align: 'right' },
  { id: 'comments', label: 'コメント数', minWidth: 100, align: 'right' },
  { 
    id: 'created_at', 
    label: '作成日時', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
  { id: 'deleted', label: 'ステータス' },
];

export default function AdminArtworks() {
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
    console.log('Viewing artwork:', row);
    // TODO: Implement view functionality
  };

  const handleEdit = (row: any) => {
    console.log('Editing artwork:', row);
    // TODO: Implement edit functionality
  };

  const handleDelete = (row: any) => {
    console.log('Deleting artwork:', row);
    // TODO: Implement delete functionality
  };

  return (
    <AdminLayout>
      <AdminTable
        title="作品管理"
        columns={columns}
        rows={dummyArtworks}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}