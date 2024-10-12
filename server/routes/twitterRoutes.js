const express = require('express');
const Twitter = require('twitter');

const router = express.Router();

// Initialize Twitter client
const client = new Twitter({
    consumer_key: process.env.TWITTER_API_KEY,
    consumer_secret: process.env.TWITTER_API_SECRET_KEY,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

// Route to fetch tweets
router.get('/test', async (req, res) => {
    try {
        const tweets = await client.get('statuses/home_timeline', { count: 5 });
        res.status(200).json(tweets);
    } catch (error) {
        res.status(500).send('Error fetching tweets: ' + error);
    }
});

module.exports = router;
