import { NextResponse } from "next/server";

function getInternalApiUrl() {
  return (
    process.env.INTERNAL_API_URL ??
    (process.env.NODE_ENV === "production"
      ? "http://api:80"
      : "http://localhost:8000")
  );
}

async function proxyToBackend(request: Request, segments: string[]) {
  const internalApiUrl = getInternalApiUrl();
  const incomingUrl = new URL(request.url);

  const upstreamUrl = new URL(
    `${internalApiUrl.replace(/\/$/, "")}/api/${segments
      .map(encodeURIComponent)
      .join("/")}`,
  );
  upstreamUrl.search = incomingUrl.search;

  const headers = new Headers(request.headers);
  headers.delete("host");

  const method = request.method.toUpperCase();
  const shouldHaveBody = method !== "GET" && method !== "HEAD";
  const body = shouldHaveBody ? await request.arrayBuffer() : undefined;

  const upstream = await fetch(upstreamUrl.toString(), {
    method,
    headers,
    body: body && body.byteLength > 0 ? body : undefined,
  });

  const contentType = upstream.headers.get("content-type") || "";
  const payload = await upstream.text();

  return new NextResponse(payload, {
    status: upstream.status,
    headers: {
      "content-type": contentType || "application/json",
    },
  });
}

export async function GET(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const shouldMock = process.env.MOCK_API === "1" || process.env.MOCK_API === "true";
  const { path } = await context.params;

  if (shouldMock) {
    return NextResponse.json(
      {
        detail:
          "Mock mode enabled and this endpoint is not mocked. Disable MOCK_API or call a mocked endpoint.",
      },
      { status: 501 },
    );
  }

  try {
    return await proxyToBackend(request, path);
  } catch (err: any) {
    return NextResponse.json(
      { detail: err?.message || "Backend unavailable" },
      { status: 502 },
    );
  }
}

export async function POST(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return GET(request, context);
}

export async function PUT(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return GET(request, context);
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return GET(request, context);
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  return GET(request, context);
}
