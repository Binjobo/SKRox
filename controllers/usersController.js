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


const create = async (req, res) => {
  const data = req.body;

  const currUserEmail = await User.findOne({ email: data.email });

  if (currUserEmail) {
    return res.status(400).json({ error: "Email already in use" });
  }

  if (data.gender === "male" && data.height > 165) {
    return res
      .status(400)
      .json({ error: "Too tall for a male, max height is 165cm" });
  }

  if (data.gender === "female" && data.height > 155) {
    return res
      .status(400)
      .json({ error: "Too tall for a female, max height is 155cm" });
  }

  if (data.password.trim().length < 3) {
    res.status(400).json({ error: "password too short" });
    return;
  }

  try {
    const user = await User.create(data);

    console.log("user", user);

    const token = createJWT(user);
    res.status(201).json({ token });
  } catch (error) {
    // res.status(500).json({ error });
    res.status(500).json({ error: "Error creating user" });
  }
};

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

const updateUser = async (req, res) => {
  const formData = req.body.formData;

  console.log("formdata", formData);

  try {
    const updatedUser = await User.findOneAndUpdate(
      { user_id: formData._id },
      {
        $set: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          day: parseInt(formData.day),
          month: parseInt(formData.month),
          year: parseInt(formData.year),
          // show_gender: formData.show_gender,
          // gender_identity: formData.gender_identity,
          // gender_interest: formData.gender_interest,
          genderInterest: formData.genderInterest,
          about: formData.about,
          url: formData.url,
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

module.exports = {
  create,
  login,
  updateUser,
};
