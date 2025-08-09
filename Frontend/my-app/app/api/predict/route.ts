const UPSTREAM = "https://emailspambackend.onrender.com/predict"

export async function POST(request: Request) {
  try {
    const { message } = await request.json()
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return Response.json({ error: "Message is required." }, { status: 400 })
    }

    const upstreamRes = await fetch(UPSTREAM, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      cache: "no-store",
    })

    const data = await upstreamRes.json().catch(() => ({}))

    if (!upstreamRes.ok) {
      return Response.json(
        { error: (data as any)?.error ?? "Upstream service error." },
        { status: upstreamRes.status || 502 },
      )
    }

    return Response.json(data, { status: 200 })
  } catch {
    return Response.json({ error: "Failed to reach classifier service." }, { status: 502 })
  }
}
