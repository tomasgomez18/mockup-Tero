import "dotenv/config";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT ?? 4000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, db: mongoose.connection.readyState === 1 });
});

async function start() {
  if (MONGO_URI) {
    try {
      await mongoose.connect(MONGO_URI);
      console.log("MongoDB conectado");
    } catch (err) {
      console.error("No se pudo conectar a MongoDB:", err);
    }
  } else {
    console.warn("MONGO_URI no definido: el servidor arranca sin base de datos");
  }
  app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));
}

start();
