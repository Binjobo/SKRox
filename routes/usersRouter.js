const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

const {
  // isAdmin,
  authenticate,
} = require("../middleware/authMiddleware.js"); //new

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
router.delete("/removematch", userController.deleteMatch);

// Admin routes
router.get(
  "/admin/users",
  // authenticate,
  // isAdmin,
  userController.getAllUsers
);

router.delete(
  "/admin/users/:id",
  // authenticate,
  // isAdmin,
  userController.deleteUser
);

module.exports = router;
