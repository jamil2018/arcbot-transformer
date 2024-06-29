import prisma from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await prisma.locator.findMany();
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const res = await prisma.locator.create({ data: body });
    return NextResponse.json({ message: "Data added", data: res });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error processing request", error: error.message },
      { status: 500 }
    );
  }
}
