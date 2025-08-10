// B案用 JWT ユーティリティ (簡易 decode) - A案では未使用
export type DecodedJWT = { exp?: number; iat?: number; [k: string]: any };

export function decodePayload(token: string): DecodedJWT | null {
  try {
    const [, payload] = token.split('.');
    if (!payload) return null;
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function secondsUntilExpiry(token: string): number | null {
  const decoded = decodePayload(token);
  if (!decoded?.exp) return null;
  return decoded.exp - Math.floor(Date.now() / 1000);
}
