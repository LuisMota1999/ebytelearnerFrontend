import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials, req) {
        try {
          const res = await fetch(process.env.API_NEXT_URL+"/Auth/Login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Accept": "*/*", "Content-Type": "application/json" },
          });

          const user = await res.json();

          if (res.ok && user) {
            return user;
          }
          
        } catch (error) {
          console.error("Error during fetch:", error);
          
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      return token.user as any;
    },
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
