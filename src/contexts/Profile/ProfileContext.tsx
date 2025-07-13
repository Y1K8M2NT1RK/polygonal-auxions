import { FC, createContext, useContext, ReactNode, useEffect } from 'react';
import { useQuery, UseQueryExecute } from 'urql';
import { User, UserProfileDocument } from '@/generated/generated-graphql';
import { useRouter } from 'next/router';

type ProfileContextType = {
    profile: User;
    reExecuteProfile: UseQueryExecute;
    fetching: boolean;
}
type ProfileProviderProps = { children: ReactNode; };

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: FC<ProfileProviderProps> = ({children}) => {
    const [{data, fetching}, reExecuteProfile] = useQuery({
        query: UserProfileDocument,
        variables: {handle_name: useRouter().query.handle_name as string},
        requestPolicy: 'network-only',
    });
    const profile: User = data?.UserProfile;

    useEffect(() => { if (!profile) reExecuteProfile(); }, [profile, reExecuteProfile]);

    return (
        <ProfileContext.Provider value={{ profile, reExecuteProfile, fetching }}>
            {children}
        </ProfileContext.Provider>
    )
}

export const useUserProfile = () => {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useUserProfile must be used within an ProfileProvider');
    }
    return context;
}