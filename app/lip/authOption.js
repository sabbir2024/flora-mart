import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { logIntUser } from "../actions/server/auth";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            async authorize(credentials, req) {
                const user = await logIntUser(credentials);
                return user;
            }
        })
    ],
    pages: {
        signIn: '/about#login',
        error: '/about#login',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role;      // এটা সঠিক
                token.id = user._id;          // চাইলে id ও রাখতে পারেন
                token.name = user.name;
                token.email = user.email;
            }
            return token;
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role;  // এটা সঠিক
                session.user.id = token.id;
            }
            return session;
        }
    }
}