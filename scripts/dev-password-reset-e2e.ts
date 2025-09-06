import fetch from 'node-fetch';

const endpoint = process.env.GRAPHQL_ENDPOINT || 'http://localhost:3001/api/graphql';
const email = process.env.TEST_EMAIL || 'Jeff_Ernser@yahoo.com';
const newPassword = process.env.TEST_NEW_PASSWORD || 'TempPass123!';

async function main() {
  console.log(`[e2e] Target endpoint: ${endpoint}`);
  console.log(`[e2e] Target email: ${email}`);

  // 1) Issue CSRF
  const csrfQuery = `mutation IssueCsrf { issueCsrfToken }`;
  const csrfResp = await fetch(endpoint, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query: csrfQuery }),
  });
  if (!csrfResp.ok) throw new Error(`issueCsrfToken HTTP ${csrfResp.status}`);
  const csrfJson = await csrfResp.json();
  if (!csrfJson.data?.issueCsrfToken) throw new Error('issueCsrfToken returned falsy');
  const setCookie = csrfResp.headers.get('set-cookie') || '';
  const csrfCookie = /csrfToken=([^;]+)/.exec(setCookie)?.[1];
  if (!csrfCookie) throw new Error('csrf cookie missing');
  console.log('[e2e] CSRF issued');

  // 2) requestPasswordReset
  const reqMutation = `
    mutation RequestPasswordReset($emailOrHandle: String!) {
      requestPasswordReset(emailOrHandle: $emailOrHandle) {
        __typename
        ... on MutationRequestPasswordResetSuccess { success token }
        ... on ZodError { message }
      }
    }
  `;
  const reqResp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': csrfCookie,
      cookie: `csrfToken=${csrfCookie}`,
    },
    body: JSON.stringify({ query: reqMutation, variables: { emailOrHandle: email } }),
  });
  const reqJson = await reqResp.json();
  const reqData = reqJson.data?.requestPasswordReset;
  if (!reqData) throw new Error('requestPasswordReset missing');
  if (reqData.__typename === 'ZodError') throw new Error(`requestPasswordReset zod: ${reqData.message}`);
  if (!reqData.success) throw new Error('requestPasswordReset success=false');
  const token: string | undefined = reqData.token ?? undefined;
  if (!token) {
    console.warn('[e2e] No token returned; this may occur in non-dev environments, aborting reset step.');
    console.log('[e2e] requestPasswordReset success; manual email delivery should include link.');
    return;
  }
  console.log('[e2e] Password reset token acquired');

  // 3) resetPassword
  const resetMutation = `
    mutation ResetPassword($token: String!, $password: String!, $passwordConfirmation: String!) {
      resetPassword(token: $token, password: $password, passwordConfirmation: $passwordConfirmation) {
        __typename
        ... on MutationResetPasswordSuccess { data }
        ... on ZodError { message }
      }
    }
  `;
  const resetResp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': csrfCookie,
      cookie: `csrfToken=${csrfCookie}`,
    },
    body: JSON.stringify({ query: resetMutation, variables: { token, password: newPassword, passwordConfirmation: newPassword } }),
  });
  const resetJson = await resetResp.json();
  const resetData = resetJson.data?.resetPassword;
  if (!resetData) throw new Error('resetPassword missing');
  if (resetData.__typename === 'ZodError') throw new Error(`resetPassword zod: ${resetData.message}`);
  if (!resetData.data) throw new Error('resetPassword returned data=false');
  console.log('[e2e] Password reset succeeded');

  // 4) Try login
  const loginMutation = `
    mutation Login($email:String!,$password:String!){
      login(email:$email,password:$password){
        __typename
        ... on MutationLoginSuccess { data { accessToken } }
        ... on ZodError { message }
      }
    }
  `;
  const loginResp = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-csrf-token': csrfCookie,
      cookie: `csrfToken=${csrfCookie}`,
    },
    body: JSON.stringify({ query: loginMutation, variables: { email, password: newPassword } }),
  });
  const loginJson = await loginResp.json();
  const loginData = loginJson.data?.login;
  if (!loginData) throw new Error('login missing');
  if (loginData.__typename !== 'MutationLoginSuccess') throw new Error('login did not succeed');
  console.log('[e2e] Login with new password succeeded');
}

main().catch((e) => { console.error('[e2e] Failed', e); process.exit(1); });
