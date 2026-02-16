import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(request: Request) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({ message: "No autorizado" }, { status: 401 })
    }

    const data = await request.json();
    const addProject = await prisma.project.create({
        data: {
            title: data.title,
            description: data.description,
            user: {
                connect: {
                    id: parseInt(session?.user.id)
                }
            }
        }
    })

    return NextResponse.json(addProject, { status: 201 })
}
