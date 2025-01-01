import { authExchange } from '@urql/exchange-auth';
import { parse } from 'cookie';
import { Operation, CombinedError } from 'urql';

const getTokenFromCookies = (): string => {
    // クライアントサイドでクッキーからトークンを取得
    const cookies = parse(document.cookie || '');
    return cookies.token || '';
};
  
const createAuthExchange = () => authExchange(async (utils) => {
    return {
        addAuthToOperation(operation: Operation) {
            const token = getTokenFromCookies();
            if (token) {
                return utils.appendHeaders(operation, {
                    Authorization: `Bearer ${token}`,
                });
            }
            return operation;
        },
        didAuthError(error: CombinedError) {
            return error.graphQLErrors.some((e: any) => 
                e.extensions?.code === 'FORBIDDEN' || 
                e.extensions?.code === 'UNAUTHORIZED' ||
                e.extensions?.code === 'AUTH_EXPIRED'
            );
        },
        async refreshAuth() {
            // トークンのリフレッシュ処理をサーバーサイドで行う必要があるので、必要に応じてリフレッシュAPIを呼び出す
            const response = await fetch('/api/refresh-token', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Failed to refresh token');
            }
            // 新しいトークンがクッキーに設定されていることを前提に、トークンを取得
            const newToken = getTokenFromCookies();
            if (!newToken) {
                throw new Error('No new token available');
            }
        },
    };
});
  
export default createAuthExchange;