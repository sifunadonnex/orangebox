import Credentials from "next-auth/providers/credentials";

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { login } from "@/action/api-action"

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }
        const response = await login(credentials);

        if (response.error) {
          throw new Error(response.error);
        }
        if (response.user) {
          return response.user;
        }else{
          throw new Error("Invalid credentials");
        }
      },
      callbacks: {
        async signIn({ user }) {
          if (!user.email?.endsWith(process.env.ALLOWED_DOMAIN)) {
            throw new Error("You are not allowed to access this platform");
          }
          return true;
        },

        jwt: async ({ token, user }) => {
          if (user?.id) token.id = user.id;
          if (user?.role) token.role = user.role;
          return token;
        },
        async session({ session, token }) {
          if (token?.id) session.user.id = token.id;
          if (token?.role) session.user.roles = token.role;
          return session;
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
