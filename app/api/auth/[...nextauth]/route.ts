import bcrypt from 'bcrypt';
import { prisma } from "@/lib/prisma";
import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "example@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const { email, password } = credentials as { email: string, password: string };
                const userFound = await prisma.user.findUnique({ where: { email: email } })
                console.log(userFound);

                if (!userFound) throw new Error('Credeciales incorrectas');

                const isValidPassword = await bcrypt.compare(password, userFound.password);
                if (!isValidPassword) throw new Error('Credeciales incorrectas');

                return {
                    id: userFound.id + "",
                    name: userFound.name,
                    email: userFound.email
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) token.id = user.id
            return token
        },
        async session({ session, user, token }) {
            if (token) session.user.id = token.sub as string
            return session
        },
    },
    pages: {
        signIn: '/auth/login',
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }