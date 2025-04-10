import { useAuth } from '@/contexts/AuthContexts';
import NotLoggedIn from './components/home/HomeNotLoggedIn';
import LoggedIn from './components/home/HomeLoggedIn';

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