import React from 'react';
import { Container, CircularProgress } from '@mui/material';
import { ProfileSkeleton } from '@/components/skeletons';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileTabs from '@/components/profile/ProfileTabs';
import Head from 'next/head';
import { useUserProfile } from '@/contexts/Profile/ProfileContext';
import NotFound from '@/components/NotFound';

export default function Profile(){
    const {profile, fetching} = useUserProfile();

    if (fetching) return (<ProfileSkeleton />);
    if (!profile) return (<NotFound />);

    return (
        <Container sx={{my:2}}>
            <Head>
                <title>{
                    `${profile?.handle_name}さん`
                    +`${profile?.handle_name===profile?.handle_name?'（あなた）':''}`
                    +`のプロフィール`
                }</title>
            </Head>
            {!!profile && <ProfileHeader viewing_user={profile}/>}
            {!!profile && <ProfileTabs user={profile}/>}
        </Container>
    )
}

