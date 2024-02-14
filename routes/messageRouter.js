const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

//get
router.get("/messages", messageController.getMessage);

//post
router.post("/message", messageController.addMessage);

module.exports = router;
