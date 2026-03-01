import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "pong (mock)",
    time: new Date().toISOString(),
    mocked: true,
  });
}
