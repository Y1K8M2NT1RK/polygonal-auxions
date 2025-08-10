// B案: Access + Refresh Token 二段型用 authExchange
import { Exchange, Operation } from 'urql';
import { pipe, map, mergeMap, fromPromise, fromValue } from 'wonka';
import { getAccessToken, setAccessToken } from '@/lib/auth/tokenStore';
import { print } from 'graphql';
import { RefreshDocument } from '@/generated/generated-graphql';

let refreshing: Promise<void> | null = null;

async function ensureFreshToken(): Promise<void> {
  if (refreshing) return refreshing;
  refreshing = (async () => {
    try {
      const secs = ((): number | null => {
        const t = getAccessToken();
        if (!t) return null;
        try {
          const [, p] = t.split('.');
          const d = JSON.parse(atob(p.replace(/-/g,'+').replace(/_/g,'/')));
          if (!d.exp) return null;
          return d.exp - Math.floor(Date.now()/1000);
        } catch { return null; }
      })();
      if (secs !== null && secs > 60) return; // 60秒以上残っていれば不要
      const resp = await fetch('/api/graphql', {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        credentials:'include',
        body: JSON.stringify({ query: print(RefreshDocument) })
      });
      const json = await resp.json();
      const newToken = json?.data?.refresh?.accessToken || json?.data?.refresh?.access_token;
      if (typeof newToken === 'string') setAccessToken(newToken);
    } finally {
      refreshing = null;
    }
  })();
  return refreshing;
}

export const authExchangeB: Exchange = ({ forward }) => ops$ =>
  pipe(
    ops$,
    mergeMap((op) =>
      pipe(
        fromPromise(ensureFreshToken()),
        mergeMap(() => fromValue(undefined)),
        map(() => {
          const t = getAccessToken();
          const prev = op.context.fetchOptions;
          const prevObj: RequestInit = typeof prev === 'function' ? prev() : (prev || {});
          const headers = { ...(prevObj.headers as Record<string,string>|undefined), ...(t ? { Authorization: `Bearer ${t}` } : {}) };
          const fetchOptions: RequestInit = { ...prevObj, headers, credentials: 'include' };
          return { ...op, context: { ...op.context, fetchOptions } } as Operation;
        }),
        forward
      )
    )
  );

export default authExchangeB;
