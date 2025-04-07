import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';

type PauseContextType = { isPaused: boolean; setPaused: React.Dispatch<React.SetStateAction<boolean>>; };
type PauseProviderProps = { children: ReactNode; initialPaused: boolean; };

const PauseContext = createContext<PauseContextType | undefined>(undefined);

export const PauseProvider: React.FC<PauseProviderProps> = ({ children, initialPaused = false }) => {

    const [isPaused, setPaused] = useState<boolean>(initialPaused);
    const router = useRouter();
    const previousPath = useRef(router.asPath); // 現在のパスを取得

    useEffect(() => setPaused(initialPaused), [initialPaused]);

    // 画面遷移を検知してpauseをリセット
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            if (url !== previousPath.current){
                previousPath.current = url;
                setPaused(initialPaused); // 画面遷移時にpauseを無効化
            }
        };
        router.events.on('routeChangeComplete', handleRouteChange);
        return () => {router.events.off('routeChangeComplete', handleRouteChange);};
    }, []);

    return (
        <PauseContext.Provider value={{ isPaused, setPaused }}>
            {children}
        </PauseContext.Provider>
    )
}

export const usePause = () => {
    const context = useContext(PauseContext);
    if (context === undefined) {
        throw new Error('usePause must be used within an PauseProvider');
    }
    return context;
};
