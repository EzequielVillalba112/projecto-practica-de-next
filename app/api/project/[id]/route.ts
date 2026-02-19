import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const validId = (id: string) => {
    if (!id) {
        return NextResponse.json({ message: "Id no encontrado" }, { status: 404 })
    }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        validId(id);

        const project = await prisma.project.findUnique({ where: { id: parseInt(id) } });

        if (!project) {
            return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 })
        }

        return NextResponse.json(project, { status: 200 });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 })
            }
        }
    }
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const data = await request.json();

        validId(id);

        const updateData = await prisma.project.update({ where: { id: parseInt(id) }, data: data });

        if (!updateData) {
            return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 })
        }

        return NextResponse.json(updateData, { status: 200 });

    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 })
            }
        }

        return NextResponse.json({ message: "Error al actualizar el proyecto" }, { status: 500 })
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        validId(id);

        const projectDelete = await prisma.project.delete({ where: { id: parseInt(id) } });

        if (!projectDelete) {
            return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 })
        }

        return NextResponse.json({ message: "Proyecto eliminado" }, { status: 200 });
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                return NextResponse.json({ message: "Proyecto no encontrado" }, { status: 404 })
            }
        }

        return NextResponse.json({ message: "Error al eliminar el proyecto" }, { status: 500 })
    }
}
