import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { logIntUser } from "../actions/server/auth";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            // credentials: {
            //     // username: { label: "Username", type: "text", placeholder: "jsmith" },
            //     // password: { label: "Password", type: "password" }
            // },
            async authorize(credentials, req) {
                const user = await logIntUser(credentials);

                return user;

            }
        })
    ],
    // Add these important options
    pages: {
        signIn: '/about#login',  // Custom login page
        error: '/about#login',   // Redirect back to login on error
    }
}