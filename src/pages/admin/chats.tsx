import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';

// Dummy data for chats
const dummyChats = [
  {
    id: 1,
    participants: '田中太郎, 佐藤花子',
    last_message: '作品について質問があります',
    last_message_at: '2024-02-05T10:30:00Z',
    unread_count: 2,
    active: true,
  },
  {
    id: 2,
    participants: '鈴木次郎, 田中太郎',
    last_message: 'ありがとうございました',
    last_message_at: '2024-02-04T15:20:00Z',
    unread_count: 0,
    active: true,
  },
  {
    id: 3,
    participants: '佐藤花子, システム',
    last_message: 'サポートが必要です',
    last_message_at: '2024-02-03T11:45:00Z',
    unread_count: 1,
    active: false,
  },
];

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'participants', label: '参加者', minWidth: 200 },
  { id: 'last_message', label: '最新メッセージ', minWidth: 250 },
  { 
    id: 'last_message_at', 
    label: '最終更新', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
  { id: 'unread_count', label: '未読数', minWidth: 80, align: 'right' },
  { id: 'active', label: 'ステータス' },
];

export default function AdminChats() {
  // AdminRouteGuard via AdminLayout handles auth gating/redirect
  const handleView = (row: any) => {
    console.log('Viewing chat:', row);
    // TODO: Implement view functionality
  };

  const handleEdit = (row: any) => {
    console.log('Editing chat:', row);
    // TODO: Implement edit functionality
  };

  const handleDelete = (row: any) => {
    console.log('Deleting chat:', row);
    // TODO: Implement delete functionality
  };

  return (
    <AdminLayout>
      <AdminTable
        title="チャット管理"
        columns={columns}
        rows={dummyChats}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}