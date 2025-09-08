import { useRouter } from 'next/router';
import NotificationsPage from '../index';

export default function NotificationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // The main notifications page handles both list and detail views
  // For mobile, it shows detail when id is present
  // For desktop/tablet, it shows both in split view
  return <NotificationsPage />;
}