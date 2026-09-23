import cors from "cors";
import express from "express";

const app = express();
const PORT = Number(process.env.PORT || 8080);

app.use(cors());
app.use(express.json());

app.get("/api/v1/sod/telemetry", (req, res) => {
  const region = req.query.region || "BD-13";

  res.json({
    region,
    environment: "staging",
    officialWarning: false,
    telemetry: {
      hazardCategory: "CYCLONE",
      alertLevel: "STAGE_1_WATCH",
      rainfallMm: 62.4,
      windKph: 78.3,
      updatedAt: new Date().toISOString()
    }
  });
});

app.post("/api/v1/sod/trigger", (req, res) => {
  const {
    alertLevel = "STAGE_2_DANGER",
    districtCode = "BD-13",
    hazardCategory = "CYCLONE"
  } = req.body || {};

  res.status(202).json({
    accepted: true,
    workflow: "SOD_EMERGENCY_TRIGGER",
    alertLevel,
    districtCode,
    hazardCategory,
    receivedAt: new Date().toISOString()
  });
});

app.get("/health", (_req, res) => {
  res.json({
    service: "shanta-econ-sod-mock-server",
    status: "healthy",
    officialWarning: false
  });
});

app.listen(PORT, () => {
  console.log(`[Shanta Econ OS] Bangladesh SOD Staging Mock API running on port ${PORT}`);
});
