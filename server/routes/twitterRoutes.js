const express = require("express");
const Twitter = require("twitter-v2");

const router = express.Router();

const client = new Twitter({
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});


// Fetch user details by username
router.get("/user/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const { data } = await client.get(`users/by/username/${username}`);
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).send("Error fetching user: " + JSON.stringify(error));
  }
});

// Fetch tweets from a specific user by user ID
router.get("/tweets/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const tweets = await client.get(`users/${userId}/tweets`, {
      max_results: 5,
    });
    res.status(200).json(tweets.data);
  } catch (error) {
    console.error("Error fetching tweets:", error);
    res.status(500).send("Error fetching tweets: " + error.message);
  }
});

module.exports = router;
