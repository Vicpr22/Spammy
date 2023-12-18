import { NextResponse } from "next/server.js";

export function GET() {
  return NextResponse.json({
    success: true,
    message: "Welcome to the Spammer Server!",
  });
}
