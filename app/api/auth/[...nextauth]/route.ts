import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { Account, User as AuthUser } from "next-auth";
import connectToDatabase from "@/lib/database";
import User from "@/lib/database/models/user.model";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions: any = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
        role: { label: "Role", type: "text" }, // Fixed: Role should be sent as a text field
      },
      async authorize(credentials: any) {
        if (!credentials?.email || !credentials?.password) {
          // !credentials?.name ||
          // !credentials?.role
          throw new Error("All fields are required");
        }

        await connectToDatabase();

        const existingUser = await User.findOne({ email: credentials.email });

        if (!existingUser) {
          // signup
          const hashedPassword = await bcrypt.hash(credentials.password, 10);

          const newUser = await User.create({
            email: credentials.email,
            name: credentials.name,
            role: credentials.role,
            password: hashedPassword,
          });

          return {
            id: newUser._id.toString(),
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
            image: newUser.image,
          };
        }

        // login
        const isEmailMatch = credentials.email === existingUser.email;
        const isPasswordMatch = await bcrypt.compare(
          credentials.password,
          existingUser.password
        );

        if (!isEmailMatch) {
          throw new Error("Email not found");
        } else if (!isPasswordMatch) {
          throw new Error("Password is incorrect");
        }

        return {
          id: existingUser._id.toString(),
          email: existingUser.email,
          name: existingUser.name,
          role: existingUser.role,
          image: existingUser.image,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        await connectToDatabase();

        try {
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            await User.updateOne(
              { email: user.email },
              {
                $set: {
                  fullName: user.name,
                  image: user.image,
                },
              }
            );
          } else {
            await User.create({
              email: user.email,
              name: user.name,
              role: "Client",
              image: user.image,
            });

            return true;
          }
        } catch (error) {
          console.error("Error saving user", error);
          return false;
        }
      } else {
      }
      return true;
    },
  },
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
