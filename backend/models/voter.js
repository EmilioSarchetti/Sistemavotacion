const { Schema, model } = require("mongoose");

const VoterSchema = new Schema(
  {
    dni:        { type: String, required: true, unique: true, match: /^\d{7,8}$/ },
    nombre:     { type: String, required: true },
    edad:       { type: Number, required: true, min: 16 },
    sexo:       { type: String, enum: ["F", "M", "X"], required: true },
    nacimiento: { type: String, required: true },
    residencia: { type: String, required: true },
    candidato:  { type: String, required: true }
  },
  { versionKey: false }
);

module.exports = model("voter", VoterSchema);
