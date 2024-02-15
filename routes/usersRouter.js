const express = require("express");
const router = express.Router();
const userController = require("../controllers/usersController");

const { isAdmin, authenticate } = require("../middleware/authMiddleware.js"); //new

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

// // get all users (admin route)
// router.get("/users", isAdmin, userController.getAllUsers);
// router.delete("/users/:userId", isAdmin, userController.deleteUser);

// // Admin routes
router.get("/admin/users", authenticate, isAdmin, userController.getAllUsers); // Protected admin route to get all users
// router.delete('/admin/users/:id', isAdmin, userController.deleteUser); // Protected admin route to delete a user

// //protected user route
// router.get("/user-auth", authenticate, (req, res) => {
//   res.status(200).send;
//   ({ ok: true });
// });

// //protected admin route
// router.get("/admin-auth", authenticate, isAdmin, (req, res) => {
//   res.status(200).send;
//   ({ ok: true });
// });

module.exports = router;
