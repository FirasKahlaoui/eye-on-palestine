const express = require('express');
const admin = require('./firebase');
const twitterClient = require('./twitter');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/tweets', (req, res) => {
  const params = { q: '#Palestine', count: 10 };
  twitterClient.get('search/tweets', params, (error, tweets) => {
    if (error) return res.status(500).send(error);
    res.json(tweets);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
