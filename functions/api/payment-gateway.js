export async function onRequestPost(context) {
  try {
    const body = await context.request.json();
    const { provider, amount, currency, tenantId, b2gDepartmentId } = body;
    const timestamp = new Date().toISOString();

    if (provider === "b2g") {
      return new Response(
        JSON.stringify({
          ok: true,
          provider: "b2g",
          transactionType: "government-treasury-disbursement",
          departmentId: b2gDepartmentId || "GOV-GENERAL",
          status: "pending-sovereign-clearance",
          gatewayEndpoint: context.env.B2G_GATEWAY_URL,
          tenantId: tenantId || "oneos-main",
          timestamp,
        }),
        { status: 202, headers: { "Content-Type": "application/json" } },
      );
    }

    if (provider === "stripe") {
      return new Response(
        JSON.stringify({
          ok: true,
          provider: "stripe",
          transactionType: "commercial-checkout",
          currency: currency || "USD",
          amount: amount || 5.0,
          status: "requires_payment_method",
          clientSecret: "pi_mock_stripe_secret_token_12345",
          tenantId: tenantId || "oneos-main",
          timestamp,
        }),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({
        ok: false,
        error: `Provider '${provider}' requires additional gateway setup.`,
        supportedProviders: [
          "stripe",
          "b2g",
          "paypal",
          "applepay",
          "googlepay",
          "bkash",
          "nagad",
        ],
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
}
