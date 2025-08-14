import { useEffect } from 'react';
import { useRouter } from 'next/router';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';
import { useAdminAuth } from '@/contexts/AdminAuthContext';

// Dummy data for notifications
const dummyNotifications = [
  {
    id: 1,
    title: 'システムメンテナンス予定',
    message: '2024年2月15日にシステムメンテナンスを実施します。',
    type: 'SYSTEM',
    published: true,
    created_at: '2024-02-01T10:30:00Z',
  },
  {
    id: 2,
    title: '新機能のお知らせ',
    message: '新しい作品投稿機能がリリースされました。',
    type: 'FEATURE',
    published: false,
    created_at: '2024-01-28T15:20:00Z',
  },
  {
    id: 3,
    title: 'イベント開催のお知らせ',
    message: '月末にアート展示イベントを開催いたします。',
    type: 'EVENT',
    published: true,
    created_at: '2024-02-03T11:45:00Z',
  },
];

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'title', label: 'タイトル', minWidth: 200 },
  { id: 'message', label: 'メッセージ', minWidth: 300 },
  { 
    id: 'type', 
    label: 'タイプ', 
    minWidth: 100,
    format: (value: string) => {
      const types: { [key: string]: string } = {
        SYSTEM: 'システム',
        FEATURE: '機能',
        EVENT: 'イベント',
      };
      return types[value] || value;
    }
  },
  { id: 'published', label: '公開状況' },
  { 
    id: 'created_at', 
    label: '作成日時', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
];

export default function AdminNotifications() {
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
    console.log('Viewing notification:', row);
    // TODO: Implement view functionality
  };

  const handleEdit = (row: any) => {
    console.log('Editing notification:', row);
    // TODO: Implement edit functionality
  };

  const handleDelete = (row: any) => {
    console.log('Deleting notification:', row);
    // TODO: Implement delete functionality
  };

  return (
    <AdminLayout>
      <AdminTable
        title="通知管理"
        columns={columns}
        rows={dummyNotifications}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}