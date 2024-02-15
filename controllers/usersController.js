const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// ---------- HELPER FUNCTIONS ---------- //

// Create token in controller

function createJWT(user) {
  return jwt.sign(
    // data payload
    // { user },
    {
      user: {
        id: user.id,
        isAdmin: user.isAdmin, // Include isAdmin status in the payload
      },
    },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

//get
const getUser = async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findOne({ user_id: userId });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getAll = async (req, res) => {
  const userIds = JSON.parse(req.query.userIds);

  try {
    const foundUsers = await User.find({ user_id: { $in: userIds } });
    res.json(foundUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getGenderedUsers = async (req, res) => {
  const gender = req.query.gender;

  try {
    const foundUsers = await User.find({ gender_identity: gender });
    res.json(foundUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const user_id = uuidv4(); // Generate a unique user_id
    const newUser = new User({ user_id, email, password: password });
    await newUser.save();

    const token = createJWT(newUser);

    // // Generate JWT token with isAdmin set to false
    // const token = jwt.sign(
    //   { userId: newUser._id, isAdmin: false },
    //   process.env.SECRET
    // );

    console.log(req.body);

    res.status(201).json({ token, userId: newUser.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json("Invalid Credentials");
    }

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      res.status(401).json({ msg: "wrong password" });
      return;
    }
    const token = createJWT(user);

    // // Generate JWT token with isAdmin included in the payload
    // const token = jwt.sign(
    //   { userId: user._id, isAdmin: user.isAdmin },
    //   process.env.SECRET
    // );

    res
      .status(201)
      .json({ token, userId: user.user_id, isAdmin: user.isAdmin });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const addMatch = async (req, res) => {
  const { userId, matchedUserId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { user_id: userId },
      { $push: { matches: { user_id: matchedUserId } } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const updateUser = async (req, res) => {
  const formData = req.body.formData;

  console.log("formdata", formData);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: formData.user_id },
      {
        $set: {
          first_name: formData.first_name,
          dob_day: parseInt(formData.dob_day),
          dob_month: parseInt(formData.dob_month),
          dob_year: parseInt(formData.dob_year),
          show_gender: formData.show_gender,
          gender_identity: formData.gender_identity,
          gender_interest: formData.gender_interest,
          url: formData.url,
          about: formData.about,
          matches: formData.matches,
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

//delete
const deleteMatch = async (req, res) => {
  const { userId, matchedUserId } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { user_id: userId },
      { $pull: { matches: { user_id: matchedUserId } } },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const getAllUsers = async (req, res) => {
  try {
    const foundUsers = await User.find({}).select(
      "email first_name gender_identity url"
    );
    res.json(foundUsers);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.userId);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signup,
  login,
  updateUser,
  getUser,
  getAll,
  getGenderedUsers,
  addMatch,
  deleteMatch,
  getAllUsers,
  deleteUser,
};
