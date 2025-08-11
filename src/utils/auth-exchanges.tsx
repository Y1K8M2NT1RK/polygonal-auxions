import { authExchange } from '@urql/exchange-auth';
import { parse } from 'cookie';
import { Operation, CombinedError, Client } from 'urql';
import { print } from 'graphql';
import { LogoutDocument } from '@/generated/generated-graphql';

const getTokenFromCookies = (): string => {
    // クライアントサイドでのみクッキーを取得
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const cookies = parse(document.cookie || '');
        return cookies.token || '';
    }
    return ''; // SSR 環境では空文字を返す
};
  
// refresh フロー廃止: トークン期限切れ時は再ログイン誘導

// authExchange 内で hook は使えない (React の Rules of Hooks 違反) ため
// useRefreshMutation/useLogoutMutation の内部と同等処理を client.mutation 経由で行う
let internalClient: Client | null = null;
export const setAuthClient = (c: Client) => { internalClient = c; };

const createAuthExchange = () => authExchange(async (utils) => {
    // authExchange 初期化時に appendHeaders で渡される utilities から client を横取りできないため
    // addAuthToOperation 内で client 参照が必要な場面は最小化する。refresh は fetch 実行で十分。
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
    async refreshAuth() { /* no-op */ },
    };
});
  
export default createAuthExchange;