import { useRouter } from 'next/router';
import NotificationsPage from './index';

export default function NotificationDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  // This page is specifically for handling deep links and direct access to notification details
  // The main notifications page handles both list and detail views based on responsive design
  // For mobile, it shows detail when id is present
  // For desktop/tablet, it shows both in split view
  return <NotificationsPage />;
}