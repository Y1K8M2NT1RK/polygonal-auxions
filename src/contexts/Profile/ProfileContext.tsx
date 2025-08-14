import { FC, createContext, useContext, ReactNode, useEffect } from 'react';
import { useQuery, UseQueryExecute } from 'urql';
import { User, UserProfileDocument } from '@/generated/generated-graphql';
import { useRouter } from 'next/router';

type ProfileContextType = {
    profile: User | undefined;
    reExecuteProfile: UseQueryExecute;
    fetching: boolean;
}
type ProfileProviderProps = { children: ReactNode; };

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: FC<ProfileProviderProps> = ({children}) => {
    const router = useRouter();
    const handleName = typeof router.query.handle_name === 'string' ? router.query.handle_name : undefined;
    const [{data, fetching}, reExecuteProfile] = useQuery({
        query: UserProfileDocument,
        variables: handleName ? { handle_name: handleName } : (undefined as any),
        pause: !handleName,
        requestPolicy: 'network-only',
    });
    const profile: User | undefined = data?.UserProfile;

    // 再取得は handle_name が存在し、かつ profile 未取得時のみ
    useEffect(() => {
        if (handleName && !profile && !fetching) {
            reExecuteProfile({ requestPolicy: 'network-only' });
        }
    }, [handleName, profile, fetching, reExecuteProfile]);

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