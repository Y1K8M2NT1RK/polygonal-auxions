import { useAuth } from '@/contexts/AuthContexts';
import NotLoggedIn from './home/components/HomeNotLoggedIn';
import LoggedIn from './home/components/HomeLoggedIn';

export default function Home() {
    const {user} = useAuth();
    return (
        <>{
            !!user
            ?   <LoggedIn />
            :   <NotLoggedIn />
        }</>
    );
}