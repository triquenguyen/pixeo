import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import executeQuery from "@/config/connect-db";
import bcrypt from "bcrypt";
import findUser from "@/libs/findUser";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "example@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const results = await findUser(email);

        const userExists = results.rows[0]

        if (!userExists) {
          throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, userExists.password);

        if (!passwordMatch) {
          throw new Error("Password is incorrect");
        }

        return {
          id: userExists.id,
          email: userExists.email,
          name: userExists.firstName + " " + userExists.lastName,
        }

      }
    })
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
      };
      return session;
    },
  },
});
