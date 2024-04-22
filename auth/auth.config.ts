import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // cookies: {
  //   sessionToken: {
  //     name:
  //       process.env.NODE_ENV === 'production'
  //         ? `__Secure-next-auth.session-token`
  //         : `next-auth.session-token`,
  //     options: {
  //       httpOnly: true,
  //       sameSite: 'lax',
  //       path: '/',
  //       secure: process.env.NODE_ENV === 'production' ? true : false,
  //     },
  //   },
  // },
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
    maxAge: 24 * 60 * 60 * 7, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: '/work' },
  // useSecureCookies: true,
  providers: [],
} satisfies NextAuthConfig;
