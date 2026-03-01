import { NextResponse } from "next/server";

function getInternalApiUrl() {
  return (
    process.env.INTERNAL_API_URL ??
    (process.env.NODE_ENV === "production"
      ? "http://api:80"
      : "http://localhost:8000")
  );
}

export async function GET() {
  const shouldMock = process.env.MOCK_API === "1" || process.env.MOCK_API === "true";
  const internalApiUrl = getInternalApiUrl();

  if (!shouldMock) {
    try {
      const upstream = await fetch(`${internalApiUrl}/api/v1/ping`, {
        method: "GET",
      });

      const contentType = upstream.headers.get("content-type") || "";
      const payload = await upstream.text();
      return new NextResponse(payload, {
        status: upstream.status,
        headers: {
          "content-type": contentType || "application/json",
        },
      });
    } catch {
      if (process.env.NODE_ENV === "production") {
        return NextResponse.json(
          {
            detail:
              "Backend unavailable while in production. Set MOCK_API=1 to force mock responses.",
          },
          { status: 502 },
        );
      }
    }
  }

  return NextResponse.json({
    message: "pong (mock)",
    time: new Date().toISOString(),
    mocked: true,
  });
}
