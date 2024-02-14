const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

//get
router.get("/user", userController.getUser);
router.get("/users", userController.getAll);
router.get("/gendered-users", userController.getGenderedUsers);

//post
router.post("/signup", userController.signup);
router.post("/login", userController.login);

//update
router.put("/addmatch", userController.addMatch);
router.put("/user", userController.updateUser);

//delete
// router.delete("/removematch", userController.deleteMatch);
// router.delete("/user", userController.deleteAccount);

module.exports = router;
