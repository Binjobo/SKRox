const express = require("express");
const router = express.Router();
const preferenceController = require("../controllers/preferenceController");

router.post("/preferences", preferenceController.savePreference);

module.exports = router;
