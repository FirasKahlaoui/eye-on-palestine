const express = require("express");
const router = express.Router();
const Twitter = require("twitter");

// Initialize Twitter client
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Define a route to fetch tweets
router.get("/tweets", (req, res) => {
  client.get(
    "statuses/user_timeline",
    { screen_name: "nodejs", count: 10 },
    function (error, tweets, response) {
      if (error) {
        console.error("Error fetching tweets:", error);
        res.status(500).send("Error fetching tweets");
      } else {
        res.json(tweets);
      }
    }
  );
});

module.exports = router;
