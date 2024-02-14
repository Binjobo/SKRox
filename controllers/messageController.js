const Message = require("../models/Message");

const getMessage = async (req, res) => {
  const { userId, correspondingUserId } = req.query;

  try {
    // Find messages from the database based on the query
    const foundMessages = await Message.find({
      from_userId: userId,
      to_userId: correspondingUserId,
    });

    res.send(foundMessages); // Send the found messages in response
  } catch (error) {
    console.log(error);
    res.status(500).send("Error retrieving messages");
  }
};

const addMessage = async (req, res) => {
  const messageData = req.body.message;
  console.log(messageData);

  try {
    const newMessage = new Message(messageData);
    const savedMessage = await newMessage.save();
    res.send(savedMessage);
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).send("Error adding message");
  }
};

module.exports = {
  getMessage,
  addMessage,
};
