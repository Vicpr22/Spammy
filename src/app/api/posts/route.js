import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET() {
  const posts = await prisma.post.findMany({
    orderBy: {
      CreatedAt: "desc",
    },
  });
  return NextResponse.json({ success: true, posts });
}

export async function POST(request, response) {
  try {
    const { text } = await request.json();
    if (!text) {
      return NextResponse.json({
        success: false,
        error: "You must enter a valid message",
      });
    }
    const post = await prisma.post.create({ data: { text } });
    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
