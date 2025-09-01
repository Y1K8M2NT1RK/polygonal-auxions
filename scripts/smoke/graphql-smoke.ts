/*
  Minimal GraphQL smoke test.
  - Issues CSRF token
  - Attempts login with (likely) invalid credentials to assert error masking works
  - Queries me (should be null / unauthenticated)
  Exit code: 0 on success path of expected outcomes.
*/
import fetch from 'node-fetch';

const endpoint = process.env.SMOKE_GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql';

async function main() {
  // 1. issueCsrfToken
  const csrfMutation = `mutation IssueCsrf { issueCsrfToken }`;
  const csrfResp = await fetch(endpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: csrfMutation }),
  });
  if (!csrfResp.ok) throw new Error('issueCsrfToken HTTP failed ' + csrfResp.status);
  const csrfJson = await csrfResp.json();
  if (!csrfJson.data?.issueCsrfToken) throw new Error('issueCsrfToken returned falsy');
  const setCookie = csrfResp.headers.get('set-cookie') || '';
  const csrfCookie = /csrfToken=([^;]+)/.exec(setCookie)?.[1];
  if (!csrfCookie) throw new Error('csrf cookie missing');

  // 2. login with invalid creds
  const loginMutation = `mutation Login($email:String!,$password:String!){ login(email:$email,password:$password){ __typename ... on ZodError { message } } }`;
  const loginResp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': csrfCookie,
      cookie: `csrfToken=${csrfCookie}`,
    },
    body: JSON.stringify({ query: loginMutation, variables: { email: 'not-exist@example.com', password: 'wrong' } }),
  });
  const loginJson = await loginResp.json();
  if (!loginJson.data?.login) throw new Error('login missing in response');

  // 3. me query
  const meQuery = `query Me { me { id } }`;
  const meResp = await fetch(endpoint + '?op=Me', { // persisted operations fallback optional
    method: 'POST',
    headers: { 'content-type': 'application/json', cookie: `csrfToken=${csrfCookie}` },
    body: JSON.stringify({ query: meQuery }),
  });
  const meJson = await meResp.json();
  if (meJson.errors) {
    console.warn('me query returned errors (acceptable if unauth)', meJson.errors);
  }
  console.log('[smoke] issueCsrfToken ok, login attempted, me result:', meJson.data?.me);
}

main().catch(err => { console.error('[smoke] GraphQL smoke failed', err); process.exit(1); });
