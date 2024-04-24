import NextAuth from 'next-auth';

// declare module 'next-auth' {
//   interface NextAuthResult extends Update {
//     update: (
//       data: Partial<Session | { user: Partial<Session['user']> }>
//     ) => Promise<Session | null>;
//   }
// }

declare module '@auth/core/types' {
  interface User {
    email: string;
    name: string;
  }

  interface Session extends DefaultSession {
    user: {
      email: string;
      name: string;
    };
    expires: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    email: string;
    name: string;
  }
}
