// app/auth/signin/page.js

'use client';

import { signIn } from 'next-auth/react';

export default function SignIn() {
  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h2>Sign In</h2>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
      <br />
      <button onClick={() => signIn('facebook')}>Sign in with Facebook</button>
    </div>
  );
}