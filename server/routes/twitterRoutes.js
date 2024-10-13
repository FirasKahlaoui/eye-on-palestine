const express = require("express");
const Twitter = require("twitter");

const router = express.Router();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Fetch user details by username
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await client.get("users/by/username/" + username);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user: " + JSON.stringify(error));
  }
});

module.exports = router;
