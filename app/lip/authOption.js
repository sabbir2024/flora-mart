import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import { logoutUser } from "../actions/server/auth";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                // username: { label: "Username", type: "text", placeholder: "jsmith" },
                // password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = await logoutUser(credentials);

                return user;

            }
        })
    ],
}