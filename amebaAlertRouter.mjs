/**
 * SHANTA ECON OS™ — Real-Time Telegram & Slack Alert Router
 * Dispatches instant notifications upon system health anomaly or breach event.
 */
export async function dispatchTelemetryAlert(payload = {}) {
  const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL;

  const riskScore =
    typeof payload.compositeRisk === "number"
      ? payload.compositeRisk.toFixed(2)
      : "N/A";

  const alertMessage =
    "🚨 *[SS6CONNECT OS] Health Alert*\n\n" +
    `*Service:* ${payload.service || "earthquake.ss6connect.com"}\n` +
    `*Status:* ${payload.status || "unknown"}\n` +
    `*Risk Score:* ${riskScore}\n` +
    `*Timestamp:* ${new Date().toISOString()}\n` +
    `*Details:* ${payload.message || "No details provided."}`;

  if (telegramBotToken && telegramChatId) {
    try {
      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: alertMessage,
          parse_mode: "Markdown",
        }),
      });
      console.log("[Alert Router] Telegram notification sent.");
    } catch (err) {
      console.error("[Alert Router] Telegram dispatch failed:", err.message);
    }
  }

  if (slackWebhookUrl) {
    try {
      await fetch(slackWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: alertMessage }),
      });
      console.log("[Alert Router] Slack notification sent.");
    } catch (err) {
      console.error("[Alert Router] Slack dispatch failed:", err.message);
    }
  }
}
