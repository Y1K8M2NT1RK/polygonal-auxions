// B案用 (Access + Refresh Token) の in-memory token store 雛形
// 現在は A案デプロイ前提のため未使用。Bブランチ移行時に有効化。

let accessToken: string | null = null;
const listeners = new Set<() => void>();

export const getAccessToken = () => accessToken;
export const setAccessToken = (t: string | null) => {
  accessToken = t;
  listeners.forEach(fn => fn());
};
export const onAccessTokenChange = (fn: () => void) => { listeners.add(fn); return () => listeners.delete(fn); };
