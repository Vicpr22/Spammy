import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";

export async function GET(request, response) {
  try {
    const { postId } = response.params;

    const foundPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!foundPost) {
      return NextResponse.json({
        success: false,
        message: "No post found using that ID",
      });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId,
      },
    });

    return NextResponse.json({ success: true, comments });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function POST(request, response) {
  try {
    const { postId } = response.params;
    const { text } = await request.json();

    const foundPost = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    });

    if (!foundPost) {
      return NextResponse.json({
        success: false,
        message: "No post found using that ID",
      });
    }

    if (!text) {
      return NextResponse.json({
        success: false,
        message: "Please provide Text for a comment",
      });
    }

    const comment = await prisma.comment.create({ data: { text, postId } });

    return NextResponse.json({ success: true, comment });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
