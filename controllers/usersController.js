const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

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

//post
// const signup = async (req, res) => {
//   const { email, password, gender, height } = req.body;

//   const currUserEmail = await User.findOne({ email });

//   if (currUserEmail) {
//     return res.status(400).json({ error: "Email already in use" });
//   }

//   if (gender === "male" && height > 165) {
//     return res
//       .status(400)
//       .json({ error: "Too tall for a male, max height is 165cm" });
//   }

//   if (gender === "female" && height > 155) {
//     return res
//       .status(400)
//       .json({ error: "Too tall for a female, max height is 155cm" });
//   }

//   if (password.trim().length < 3) {
//     res.status(400).json({ error: "password too short" });
//     return;
//   }

//   try {
//     const user_id = uuidv4(); // Generate a unique user_id
//     const newUser = new User({ user_id, email, password: password });
//     await newUser.save();

//     const token = createJWT(newUser);
//     console.log(req.body);

//     res.status(201).json({ token, userId: newUser.user_id });
//   } catch (error) {
//     // res.status(500).json({ error });
//     res.status(500).json({ error: "Error creating user" });
//   }
// };

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
    console.log(req.body);

    res.status(201).json({ token, userId: newUser.user_id });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

// const login = async (req, res) => {
//   const data = req.body;

//   const user = await User.findOne({ email: data.email });

//   try {
//     if (user === null) {
//       res.status(401).json({ msg: "user not found" });
//       return;
//     }

//     console.log(data.password);
//     console.log(user.password);

//     const check = await bcrypt.compare(data.password, user.password);
//     if (!check) {
//       res.status(401).json({ msg: "wrong password" });
//       return;
//     }

//     const token = createJWT(user);

//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// };

//update

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
    res.status(201).json({ token, userId: user.user_id });
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

//delete
// const deleteMatch = async (req, res) => {};

// const deleteAccount = async (req, res) => {};

module.exports = {
  signup,
  login,
  updateUser,
  getUser,
  getAll,
  getGenderedUsers,
  addMatch,
  // deleteMatch,
  // deleteAccount,
};
