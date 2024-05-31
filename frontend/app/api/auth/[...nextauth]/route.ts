import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/app/_utils/database";
import { signIn } from "next-auth/react";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcrypt";
import User from "@/scheme/User";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectMongoDB();

        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter your email and password");
        }

        const user = await User.findOne({ email: credentials?.email });
        console.log("User found:", user);

        if (!user || !user?.password) {
          throw new Error("No user found");
        }

        const isValidPassword = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("Password is valid:", isValidPassword);

        if (!isValidPassword) {
          throw new Error("Invalid password");
        }
        return user;
      },
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async jwt({ token, user }) {
      await connectMongoDB();
      const userData = await User.findOne({ email: user?.email });
      return { ...token, ...userData, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
    async signIn({ user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        const { name, email } = user;
        try {
          await connectMongoDB();

          const userExists = await User.findOne({ email });

          if (!userExists) {
            const res = await fetch("http://localhost:3000/api/user", {
              method: "POST",
              body: JSON.stringify({ name, email }),
              headers: {
                "Content-Type": "application/json",
              },
            });
            if (res.ok) {
              const data = await res.json();
              console.log("data:", data);
              return data.user;
            }
          }
          console.log(userExists);
          return userExists;
        } catch (error) {
          console.error(error);
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
