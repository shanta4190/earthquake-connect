export async function onRequest(context) {
  const healthPayload = {
    ok: true,
    service: "earthquake-connect",
    mode: "observation-only",
    officialWarning: false,
    version: "4.0",
    frontend: "cloudflare-pages",
    dataPlane: "separate",
  };

  return new Response(JSON.stringify(healthPayload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
