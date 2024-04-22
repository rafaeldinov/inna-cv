import Credentials from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export const {
  auth,
  signIn,
  signOut,
  unstable_update,
  handlers: { GET, POST },
} = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        login: { label: 'text', type: 'text', required: true },
        password: { label: 'password', type: 'password', required: true },
      },
      async authorize(credentials) {
        const text = credentials?.login;
        const password = credentials?.password;

        if (
          text === process.env.ADMIN_LOGIN &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return {
            email: 'info@innadinova.com',
            name: 'Inna',
          };
        }
        return null;
      },
    }),
  ],
});
