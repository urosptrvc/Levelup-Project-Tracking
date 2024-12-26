import NextAuth, { NextAuthOptions } from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"


export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {}
                if (!email || !password) {
                    throw new Error("Email and password are required.")
                }
                const user = await prisma.user.findUnique({ where: { email } })
                if (!user) {
                    throw new Error("User not found.");
                }
                const isValid = await compare(password, user.password)
                if (!isValid) throw new Error("Invalid password.")
                return { id: user.id, email: user.email, name: user.name, role: user.role }
            },
        }),
    ],
    session: { strategy: "jwt" },
    jwt: { secret: process.env.NEXTAUTH_SECRET || "super-secret" },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id
                session.user.role = token.role
            }
            return session
        },
    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
