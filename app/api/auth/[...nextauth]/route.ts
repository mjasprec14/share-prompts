import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from '@utils/database';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  async session({ session }: { session: any }) {},
  async signIn({ profile }: { profile: string }) {
    try {
      await connectToDB();

      // check if user already exist

      // create new user
    } catch (error) {
      console.log('Failed to Sign In: ', error);

      return false;
    }
  },
  callbacks: {
    session({ session, token, user }) {
      return session; // The return type will match the one returned in `useSession()`
    },
  },
});

export { handler as GET, handler as POST };
