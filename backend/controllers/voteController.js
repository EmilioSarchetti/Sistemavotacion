// backend/controllers/voteController.js
const Voter = require("../models/voter");

/* POST /api/votes */
const emitVote = async (req, res) => {
  try {
    const voter = await Voter.create(req.body);
    return res.status(201).json({ ok: true, voter });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ ok: false, msg: "DNI ya registró un voto" });
    }
    console.error("❌ Error al guardar voto:", err.message);
    return res.status(400).json({ ok: false, msg: err.message });
  }
};

/* GET /api/votes/results */
const getResults = async (_req, res) => {
  const agg = await Voter.aggregate([
    { $group: { _id: "$candidato", total: { $sum: 1 } } }
  ]);
  res.json(agg);
};

/* GET /api/votes/voters */
const getVoters = async (_req, res) => {
  const list = await Voter.find(
    {},
    "-_id dni nombre edad sexo nacimiento residencia candidato"
  ).lean();

  // Mostrar primeros 4 dígitos y ocultar el resto
  list.forEach(v => {
    const visible = v.dni.slice(0, 4);                 // primeros 4
    const hidden  = "•".repeat(Math.max(v.dni.length - 4, 0)); // resto
    v.dni = visible + hidden;
  });

  res.json(list);
};


module.exports = { emitVote, getResults, getVoters };
