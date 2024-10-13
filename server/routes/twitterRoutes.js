const express = require("express");
const Twitter = require("twitter");

const router = express.Router();

const client = new Twitter({
  consumer_key: process.env.TWITTER_API_KEY,
  consumer_secret: process.env.TWITTER_API_SECRET_KEY,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Fetch tweets from a specific user
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const tweets = await client.get("statuses/user_timeline", {
      screen_name: username,
      count: 5,
    });
    res.status(200).json(tweets);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).send("Error fetching tweets: " + JSON.stringify(error));
  }
});

module.exports = router;
