import AdminLayout from '@/components/admin/AdminLayout';
import AdminTable, { TableColumn } from '@/components/admin/AdminTable';

// Dummy data for reports
const dummyReports = [
  {
    id: 1,
    reporter_name: '田中太郎',
    reported_content: '不適切なコメント',
    target_type: 'COMMENT',
    target_id: 123,
    reason: 'スパム行為',
    status: 'PENDING',
    created_at: '2024-02-05T10:30:00Z',
  },
  {
    id: 2,
    reporter_name: '佐藤花子',
    reported_content: '著作権違反の疑い',
    target_type: 'ARTWORK',
    target_id: 456,
    reason: '著作権侵害',
    status: 'RESOLVED',
    created_at: '2024-02-04T15:20:00Z',
  },
  {
    id: 3,
    reporter_name: '鈴木次郎',
    reported_content: 'ユーザーの不正行為',
    target_type: 'USER',
    target_id: 789,
    reason: 'ハラスメント',
    status: 'IN_PROGRESS',
    created_at: '2024-02-03T11:45:00Z',
  },
];

const columns: TableColumn[] = [
  { id: 'id', label: 'ID', minWidth: 50 },
  { id: 'reporter_name', label: '報告者', minWidth: 120 },
  { id: 'reported_content', label: '報告内容', minWidth: 200 },
  { 
    id: 'target_type', 
    label: '対象タイプ', 
    minWidth: 100,
    format: (value: string) => {
      const types: { [key: string]: string } = {
        COMMENT: 'コメント',
        ARTWORK: '作品',
        USER: 'ユーザー',
      };
      return types[value] || value;
    }
  },
  { id: 'reason', label: '理由', minWidth: 150 },
  { 
    id: 'status', 
    label: 'ステータス', 
    minWidth: 100,
    format: (value: string) => {
      const statuses: { [key: string]: string } = {
        PENDING: '未対応',
        IN_PROGRESS: '対応中',
        RESOLVED: '解決済み',
        REJECTED: '却下',
      };
      return statuses[value] || value;
    }
  },
  { 
    id: 'created_at', 
    label: '報告日時', 
    minWidth: 150,
    format: (value: string) => new Date(value).toLocaleDateString('ja-JP')
  },
];

export default function AdminReports() {
  const handleView = (row: any) => {
    console.log('Viewing report:', row);
    // TODO: Implement view functionality
  };

  const handleEdit = (row: any) => {
    console.log('Editing report:', row);
    // TODO: Implement edit functionality
  };

  const handleDelete = (row: any) => {
    console.log('Deleting report:', row);
    // TODO: Implement delete functionality
  };

  return (
    <AdminLayout>
      <AdminTable
        title="報告管理"
        columns={columns}
        rows={dummyReports}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </AdminLayout>
  );
}