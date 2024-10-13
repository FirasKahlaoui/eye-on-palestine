import React, { useEffect, useState } from "react";

const App = () => {
  const [articles, setArticles] = useState([]);

  const fetchArticles = async () => {
    try {
      // Fetching from News API
      const newsResponse = await fetch(
        `https://newsapi.org/v2/everything?q=Palestine&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      );
      const newsData = await newsResponse.json();

      // Fetching from GNews API
      const gnewsResponse = await fetch(
        `https://gnews.io/api/v4/search?q=Palestine&token=${process.env.REACT_APP_GNEWS_API_KEY}`
      );
      const gnewsData = await gnewsResponse.json();

      // Combine articles from both APIs
      const combinedArticles = [...newsData.articles, ...gnewsData.articles];

      setArticles(combinedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Articles about Palestine</h1>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.title}
            </a>
            <p>{article.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
