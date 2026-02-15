import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const data = await request.json();
    console.log(data);

    const NewUser = await prisma.user.create({data})

    return NextResponse.json(NewUser, { status: 201 })
}