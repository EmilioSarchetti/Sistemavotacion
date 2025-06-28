// backend/server.js
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const PORT      = process.env.PORT      || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Votacion";

const app = express();

/* -------- middlewares -------- */
app.use(cors({ origin: "http://172.20.10.13:5173" })); // ajusta según tu front
app.use(express.json());                            // parsea JSON de las requests

/* -------- conexión a Mongo -------- */
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => { console.error("❌ Error Mongo:", err); process.exit(1); });

/* -------- rutas -------- */
app.use("/api/votes", require("./routes/votes"));

const path = require("path");

/* -------- servir frontend -------- */
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

/* fallback React Router (cualquier ruta que no empiece por /api) */
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


/* -------- escucha -------- */
app.listen(PORT, () =>
  console.log(`🚀 Backend escuchando en http://localhost:${PORT}`)
);
