const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// ---------- HELPER FUNCTIONS ---------- //

// Create token in controller

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

// ---------- CREATE USER FROM SIGN UP ---------- //

const create = async (req, res) => {
  const data = req.body;

  const currUserEmail = await User.findOne({ email: data.email });

  if (currUserEmail) {
    return res.status(400).json({ error: "Email already in use" });
  }

  console.log(data);

  if (data.password.trim().length < 3) {
    res.status(400).json({ msg: "password too short" });
    return;
  }

  try {
    const user = await User.create(data);

    console.log(user);

    const token = createJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    // res.status(500).json({ error });
    res.status(500).json({ error: "Error creating user" });
  }
};

// ---------- CHECK LOG-IN ---------- //

const login = async (req, res) => {
  const data = req.body;

  const user = await User.findOne({ email: data.email });

  try {
    if (user === null) {
      res.status(401).json({ msg: "user not found" });
      return;
    }

    console.log(data.password);
    console.log(user.password);

    const check = await bcrypt.compare(data.password, user.password);
    if (!check) {
      res.status(401).json({ msg: "wrong password" });
      return;
    }

    const token = createJWT(user);

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = {
  create,
  login,
};
