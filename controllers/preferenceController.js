// controllers/preferenceController.js
const Preference = require("../models/Preference");

const savePreference = async (req, res) => {
  try {
    const { userId } = req.body;
    const { ageRange, heightRange, distance, interests } = req.body;

    // Check if preferences already exist for the user
    let preference = await Preference.findOne({ userId });

    if (!preference) {
      preference = new Preference({
        userId,
        ageRange,
        heightRange,
        distance,
        interests,
      });
    } else {
      preference.ageRange = ageRange;
      preference.heightRange = heightRange;
      preference.distance = distance;
      preference.interests = interests;
    }

    await preference.save();

    res.status(200).json({ message: "Preferences saved successfully" });
  } catch (error) {
    console.error("Error saving preferences:", error);
    res
      .status(500)
      .json({ error: "An error occurred while saving preferences" });
  }
};

module.exports = {
  savePreference,
};
