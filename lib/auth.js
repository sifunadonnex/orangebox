import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import avatar3 from "@/public/images/avatar/avatar-3.jpg";

//get users from the server
export const users = async () => {
  const response = await fetch("http://localhost:8000/users");
  const data = await response.json();
  data.forEach((user) => {
    user.resetToken = null;
    user.resetTokenExpiry = null;
    user.profile = null;
    user.image = avatar3;
    user.name = user.fullName;
  });
  return data;
};

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
        if(users){
          const user = await users();
          const foundUser = user.find((u) => u.email === credentials.email);
          if (!foundUser) {
            throw new Error("No user found");
          }
          const isValid = await bcrypt.compare(
            credentials.password,
            foundUser.password
          );
          if (!isValid) {
            throw new Error("Invalid password");
          }
          return foundUser;
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
  secret: process.env.AUTH_SECRET,

  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV !== "production",
};
