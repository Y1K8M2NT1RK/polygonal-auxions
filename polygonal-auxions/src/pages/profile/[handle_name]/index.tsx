import {
    CircularProgress,
    Container,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useQuery } from 'urql';
import type { User } from '@/pages/generated-graphql';
import { UserDocument } from '@/pages/generated-graphql';
import ProfileHeader from '@/pages/profile/components/profile-header';
import ProfileArtworks from '@/pages/profile/components/profile-artworks';
import ProfileComments from '@/pages/profile/components/profile-comments';

export default function Profile(){

    const handle_name = useRouter().query.handle_name!;
    const [result] = useQuery({query: UserDocument, variables: {handle_name}});
    const { fetching, error, data } = result;

    if (fetching) return (<CircularProgress color="inherit" />);
    if (error) return `Error! ${error.message}`;

    const user: User = data.user;

    return (
        <Container sx={{my:2}}>
            <ProfileHeader user={user}/>
            <ProfileArtworks user={user}/>
            <ProfileComments user={user}/>
        </Container>
    )
}