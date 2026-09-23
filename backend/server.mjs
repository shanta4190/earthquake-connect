import http from "node:http";
import { Client } from "pg";

const PORT = Number(process.env.PORT || 8080);

const dbConfig = {
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT || 5432),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/health") {
    const client = new Client(dbConfig);
    let dbHealthy = false;

    try {
      await client.connect();
      await client.query("SELECT 1");
      dbHealthy = true;
    } catch (error) {
      dbHealthy = false;
    } finally {
      await client.end().catch(() => {});
    }

    res.writeHead(dbHealthy ? 200 : 503, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        service: "s6_api_gateway",
        status: dbHealthy ? "healthy" : "degraded",
        database: dbHealthy ? "reachable" : "unreachable"
      })
    );
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "S6 API Gateway online" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`s6_api_gateway listening on ${PORT}`);
});
