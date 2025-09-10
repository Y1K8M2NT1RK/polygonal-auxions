import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { getUserNotifications, getUnreadNotificationsCount } from '@/utils/notifications';

export function useNotifications() {
  const { user } = useAuth();
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      const userNotifications = getUserNotifications(user.id);
      setNotifications(userNotifications);
      setUnreadCount(getUnreadNotificationsCount(user.id));
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user]);

  // Listen for localStorage changes to update counts in real-time
  useEffect(() => {
    if (!user) return;

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key?.startsWith(`notifications_read_${user.id}`)) {
        const userNotifications = getUserNotifications(user.id);
        setNotifications(userNotifications);
        setUnreadCount(getUnreadNotificationsCount(user.id));
      }
    };

    const handleNotificationsChange = () => {
      const userNotifications = getUserNotifications(user.id);
      setNotifications(userNotifications);
      setUnreadCount(getUnreadNotificationsCount(user.id));
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('notificationsChanged', handleNotificationsChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('notificationsChanged', handleNotificationsChange);
    };
  }, [user]);

  return {
    notifications,
    unreadCount,
    refreshNotifications: () => {
      if (user) {
        const userNotifications = getUserNotifications(user.id);
        setNotifications(userNotifications);
        setUnreadCount(getUnreadNotificationsCount(user.id));
      }
    }
  };
}