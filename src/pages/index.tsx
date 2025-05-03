import { useAuth } from '@/contexts/AuthContexts';
import NotLoggedIn from './home/components/HomeNotLoggedIn';
import LoggedIn from './home/components/HomeLoggedIn';
import { CircularProgress } from '@mui/material';

export default function Home() {
    const {user, fetching} = useAuth();
    return (
        <>{
            fetching
            ? <CircularProgress color='inherit' />
            : (
                !!user
                ?   <LoggedIn />
                :   <NotLoggedIn />
            )
        }</>
    );
}