import React from 'react';
import { Container, CircularProgress } from '@mui/material';
import ProfileHeader from '@/pages/profile/components/profile-header';
import ProfileArtworks from '@/pages/profile/components/profile-artworks';
import ProfileComments from '@/pages/profile/components/profile-comments';
import Head from 'next/head';
import { useUserProfile } from '@/contexts/Profile/ProfileContext';

export default function Profile(){
    const {profile, fetching} = useUserProfile();

    if (fetching) return (<CircularProgress color="inherit" />);

    return (
        <Container sx={{my:2}}>
            <Head>
                <title>{
                    `${profile?.handle_name}さん`
                    +`${profile?.handle_name===profile?.handle_name?'（あなた）':''}`
                    +`のプロフィール`
                }</title>
            </Head>
            <ProfileHeader viewing_user={profile}/>
            <ProfileArtworks user={profile}/>
            <ProfileComments user={profile}/>
        </Container>
    )
}

