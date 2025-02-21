import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import config from "@/app/utils/config";
import axios from "axios";

interface IUser {
  id: number;
  fullname: string;
  email: string;
  mediaUrl: string;
  token: string;
}
const authHandler: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "password-login",
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
          placeholder: "jsmith@email.com",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials: any) {
        const { email, password } = credentials;

        try {
          return await axios
            .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-login`, {
              ...credentials,
            })
            .then((res) => {
              if (res.status === 200 && res.data && res.data.status) {

                const user = res.data;
                return {
                  ...user.data,
                  email: user.email,
                };
              } else {
                throw new Error(res.data.message);
              }
            })
            .catch((error) => {
              console.log("error", error)
              if (error.response) {
                if (error.response.status === 400) {
                  throw "Invalid credentials";
                }
              } else if (error.request) {
                throw new Error("Check your network connection");
              } else {
                throw new Error(error.message);
              }
            });
        } catch (error: any) {
          throw new Error(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_KEY,
  },
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (trigger === "update") {
        token = { ...token, user: session };
        return token;
      }
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token, user }) {
      session.user.businessAccess = null;
      session.user = token.user;
      return session;
    },

    // authorized({ req, token }) {
    //   console.log(token);
    //   if (token) return true;
    // },
  },
};

const handler = NextAuth(authHandler);

export { handler as GET, handler as POST };
