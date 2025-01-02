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
            return;
        },
    };
});
  
export default createAuthExchange;