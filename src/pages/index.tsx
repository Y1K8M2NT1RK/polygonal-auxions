import { useAuth } from '@/contexts/AuthContexts';
import NotLoggedIn from './home/components/HomeNotLoggedIn';
import LoggedIn from './home/components/HomeLoggedIn';
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