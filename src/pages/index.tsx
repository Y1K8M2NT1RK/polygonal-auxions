import { useAuth } from '@/contexts/AuthContexts';
import NotLoggedIn from '@/components/home/HomeNotLoggedIn';
import LoggedIn from '@/components/home/HomeLoggedIn';
import { CircularProgress } from '@mui/material';
import { UserDashboardSkeleton } from '@/components/skeletons';

export default function Home() {
    const {user, fetching} = useAuth();
    return (
        <>{ 
            fetching
            ? <UserDashboardSkeleton />
            : (
                !!user
                ?   <LoggedIn />
                :   <NotLoggedIn />
            )
        }</>
    );
}