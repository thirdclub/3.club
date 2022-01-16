import Config from "config/config";
import NextAuth, { Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Database from "utils/database";
import { v4 as uuidv4 } from "uuid";

const db = new Database();
const cookieOption = {
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: true,
};

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const created = await db.getUserByEmail(user.email!);
      if (!created) {
        await db.createUser({
          id: uuidv4(),
          email: user.email!,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        });
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, user, token }) {
      if (!token.user) {
        return {} as Session;
      }
      session.user = token.user;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (token && token.email) {
        token.user = await db.getUserByEmail(token.email);
      }
      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: `_${Config.appName}-portal.session-token`,
      options: cookieOption,
    },
    callbackUrl: {
      name: `_${Config.appName}-portal.callback-url`,
      options: cookieOption,
    },
    csrfToken: {
      name: `_${Config.appName}-portal.csrf-token`,
      options: cookieOption,
    },
    pkceCodeVerifier: {
      name: `_${Config.appName}-portal.pkce.code_verifier`,
      options: cookieOption,
    },
    state: {
      name: `_${Config.appName}-portal.state`,
      options: cookieOption,
    },
  },
  secret: process.env.JWT_SECRET,
});
