import Credentials from 'next-auth/providers/credentials';
import NextAuth, { User } from 'next-auth';

export const {
  auth,
  signIn,
  signOut,
  update,
  handlers: { GET, POST },
} = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const login = credentials?.login;
        const password = credentials?.password;

        if (
          login === process.env.ADMIN_LOGIN &&
          password === process.env.ADMIN_PASSWORD
        ) {
          return {
            email: 'info@innadinova.com',
            name: 'Inna',
          } as User;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === 'update' && session) {
        return { ...token, ...session?.user };
      }

      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.email = token.email;
      session.user.name = token.name;
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 * 7,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/' },
  // useSecureCookies: true,
});
