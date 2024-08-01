import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import  CredentialsProvider  from 'next-auth/providers/credentials';
import { Account, User as AuthUser } from 'next-auth';
import bcrypt from 'bcryptjs';
import User from '@/app/models/user';
import connect from '@/utils/db';


export const authOptions: any = {
    // Configure one or more authentication providers
    providers: [
      CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials: any) {
          await connect();
          try {
            const user = await User.findOne({ email: credentials.email });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
        GithubProvider({
            clientId: process.env.GITHUB_ID ?? '',
            clientSecret: process.env.GITHUB_SECRET ?? '',
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID ?? '',
            clientSecret: process.env.GOOGLE_SECRET ?? '',
        }),
    ],
    callbacks: {
      async signIn({ user, account }: { user: AuthUser; account: Account }) {
        if (account?.provider === "credentials") {
          return user ? true : false;
        }
        if (account?.provider === "github") {
          await connect();
          try {
            const existingUser = await User.findOne({ email: user.email });
            if (!existingUser) {
              const newUser = new User({
                email: user.email,
              });
              await newUser.save();
            }
            return true;
          } catch (err) {
            console.log("Error saving user", err);
            return false;
          }
        }
        return true;
          }
        },
      };
    
    export const handler = NextAuth(authOptions);
    export { handler as GET, handler as POST };