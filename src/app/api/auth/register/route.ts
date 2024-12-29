import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hash } from "bcrypt"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const { email, password, name, role } = body

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required." },
                { status: 400 }
            )
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (existingUser) {
            return NextResponse.json(
                { error: "User with that email already exists." },
                { status: 400 }
            )
        }

        const hashedPassword = await hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: role && role !== "" ? role : "user"
            }
        })

        return NextResponse.json(
            { message: "User created successfully", userId: newUser.id },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json(
                { error: error.message || "Something went wrong." },
                { status: 500 }
            )
        }
    }
}
