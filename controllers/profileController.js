// controllers/profileController.js

const Profile = require("../models/Profile");

// Controller function to create a new profile
exports.createProfile = async (req, res) => {
  try {
    const profileData = req.body;
    const newProfile = await Profile.create(profileData);
    res.status(201).json(newProfile);
  } catch (error) {
    res.status(500).json({ error: "Error creating profile" });
  }
};
