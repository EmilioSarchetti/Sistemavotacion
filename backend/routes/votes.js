// backend/routes/votes.js
const router = require("express").Router();
const ctrl   = require("../controllers/voteController");

// /api/votes
router.post("/",        ctrl.emitVote);
router.get("/results",  ctrl.getResults);
router.get("/voters",   ctrl.getVoters);

module.exports = router;
