import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/db";
import Users from "@/models/Users";
import { NextAuthOptions } from "next-auth";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  secret: "some_long_random_string",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        try {
          await connect();
          const user = await Users.findOne({
            email: credentials?.email,
            password: credentials?.password,
          });

          if (user) {
            return {
              id: user._id,
              name: user.name,
              email: user.email,
              admin: true,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {},
};

export default authOptions;
