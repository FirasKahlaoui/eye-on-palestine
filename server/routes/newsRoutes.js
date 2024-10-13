const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch news from News API
router.get('/news', async (req, res) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=Palestine&apiKey=${process.env.NEWS_API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching news from News API:", error);
    res.status(500).send("Error fetching news: " + JSON.stringify(error));
  }
});

// Fetch news from GNews API
router.get('/gnews', async (req, res) => {
  try {
    const response = await axios.get(`https://gnews.io/api/v4/search?q=Palestine&token=${process.env.GNEWS_API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching news from GNews API:", error);
    res.status(500).send("Error fetching news: " + JSON.stringify(error));
  }
});

// Fetch news from Liveuamap API
router.get('/liveuamap', async (req, res) => {
  try {
    const response = await axios.get(`https://api.liveuamap.com/endpoint?apiKey=${process.env.LIVEUAMAP_API_KEY}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error fetching news from Liveuamap API:", error);
    res.status(500).send("Error fetching news: " + JSON.stringify(error));
  }
});

module.exports = router;