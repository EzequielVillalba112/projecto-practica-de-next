import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(request: Request) {
    const data = await request.json();
    const salt = await bcrypt.genSalt(10);

    data.password = await bcrypt.hash(data.password, salt);

    const NewUser = await prisma.user.create({data})

    const {password, ...rest} = NewUser

    return NextResponse.json(rest, { status: 201 })
}