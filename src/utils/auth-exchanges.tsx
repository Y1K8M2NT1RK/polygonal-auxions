import { authExchange } from '@urql/exchange-auth';
import { parse } from 'cookie';
import { Operation, CombinedError, Client } from 'urql';
import { print } from 'graphql';
import { RefreshDocument, LogoutDocument } from '@/generated/generated-graphql';

const getTokenFromCookies = (): string => {
    // クライアントサイドでのみクッキーを取得
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
        const cookies = parse(document.cookie || '');
        return cookies.token || '';
    }
    return ''; // SSR 環境では空文字を返す
};
  
let refreshPromise: Promise<void> | null = null;
let refreshFailed = false;

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
        async refreshAuth() {
            if (refreshFailed) return; // 既に失敗状態なら何もしない
            if (!refreshPromise) {
                refreshPromise = (async () => {
                    try {
                        if (internalClient) {
                            const result = await internalClient.mutation(RefreshDocument, {}, { fetchOptions: { credentials: 'include' } }).toPromise();
                            if (result.error) throw result.error;
                            const typename = (result.data as any)?.refresh?.__typename;
                            if (typename !== 'MutationRefreshSuccess') throw new Error('refresh failed typename');
                        } else {
                            // フォールバック: fetch (初期ロードで setAuthClient まだの場合)
                            const refreshResp = await fetch('/api/graphql', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ query: print(RefreshDocument) }),
                                credentials: 'include'
                            });
                            if (!refreshResp.ok) throw new Error('refresh network error');
                            const json = await refreshResp.json();
                            const errors = json.errors as any[] | undefined;
                            if (errors && errors.length) throw new Error('refresh graphql error');
                            const typename = json?.data?.refresh?.__typename;
                            if (typename !== 'MutationRefreshSuccess') throw new Error('refresh failed typename');
                        }
                    } catch (e) {
                        refreshFailed = true;
                        // logout を試行（失敗しても握りつぶし）
                        try {
                            if (internalClient) {
                                await internalClient.mutation(LogoutDocument, {}, { fetchOptions: { credentials: 'include' } }).toPromise();
                            } else {
                                await fetch('/api/graphql', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ query: print(LogoutDocument) }),
                                    credentials: 'include'
                                });
                            }
                        } catch {}
                    } finally {
                        refreshPromise = null;
                    }
                })();
            }
            await refreshPromise;
        },
    };
});
  
export default createAuthExchange;