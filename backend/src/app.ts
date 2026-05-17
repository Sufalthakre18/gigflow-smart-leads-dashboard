import "dotenv/config"; // dotenv v17 — same import, works identically
import express from "express";
import cors from "cors";

import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT ?? 5000;

// ─── Middlewares ───────────────────────────────────────────────────────────────

app.use(
  cors({
    origin: process.env.CLIENT_URL ?? "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Health Check ──────────────────────────────────────────────────────────────

app.get("/api/v1/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GigFlow API is running",
    timestamp: new Date().toISOString(),
  });
});


// ─── Start ─────────────────────────────────────────────────────────────────────

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV ?? "development"}`);
  });
});

export default app;