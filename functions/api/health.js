export async function onRequest(context) {
  const healthPayload = {
    ok: true,
    service: "earthquake-connect",
    mode: "observation-only",
    environment: "observation",
    officialWarning: false,
    official_warning: false,
    timestamp: new Date().toISOString(),
  };

  return new Response(JSON.stringify(healthPayload), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
  });
}
