import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';

// Dummy data for comments
const dummyComments = [
  {
    id: 1,
    body: 'とても美しい作品ですね！',
    user_name: '田中太郎',
    artwork_title: '美しい風景',
    created_at: '2024-02-02T10:30:00Z',
  },
  {
    id: 2,
    body: '素晴らしいアート作品です',
    user_name: '佐藤花子',
    artwork_title: '抽象アート',
    created_at: '2024-01-29T15:20:00Z',
  },
  {
    id: 3,
    body: 'インスピレーションを受けました',
    user_name: '鈴木次郎',
    artwork_title: 'デジタル作品',
    created_at: '2024-02-03T11:45:00Z',
  },
];

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'body', label: 'コメント内容', minWidth: 300 },
  { id: 'user_name', label: 'コメント者', minWidth: 120 },
  { id: 'artwork_title', label: '対象作品', minWidth: 200 },
  { 
    id: 'created_at', 
    label: '投稿日時', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
];

export default function AdminComments() {
  const handleView = (row: any) => {
    console.log('Viewing comment:', row);
    // TODO: Implement view functionality
  };

  const handleEdit = (row: any) => {
    console.log('Editing comment:', row);
    // TODO: Implement edit functionality
  };

  const handleDelete = (row: any) => {
    console.log('Deleting comment:', row);
    // TODO: Implement delete functionality
  };

  return (
    <AdminLayout>
      <AdminTable
        title="コメント管理"
        columns={columns}
        rows={dummyComments}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}