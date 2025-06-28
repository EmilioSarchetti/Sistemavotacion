// backend/server.js
const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const PORT      = process.env.PORT      || 4000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/Votacion";

const app = express();

/* -------- middlewares -------- */
app.use(cors({ origin: "http://localhost:5173" })); // ajusta según tu front
app.use(express.json());                            // parsea JSON de las requests

/* -------- conexión a Mongo -------- */
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB conectado"))
  .catch(err => { console.error("❌ Error Mongo:", err); process.exit(1); });

/* -------- rutas -------- */
app.use("/api/votes", require("./routes/votes"));

/* -------- escucha -------- */
app.listen(PORT, () =>
  console.log(`🚀 Backend escuchando en http://localhost:${PORT}`)
);
