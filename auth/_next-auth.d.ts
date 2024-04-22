import NextAuth from 'next-auth';

// declare module 'next-auth' {
//   interface NextAuthResult extends Update {
//     update: (
//       data: Partial<Session | { user: Partial<Session['user']> }>
//     ) => Promise<Session | null>;
//   }
// }

declare module '@auth/core/types' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      email: string;
      name: string;
    };
    expires: string;
  }
}

declare module '@auth/core/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    email: string;
    name: string;
  }
}
