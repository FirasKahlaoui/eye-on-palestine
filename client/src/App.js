import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const newsApiUrl = `https://newsapi.org/v2/everything?q=${
        keyword || "Palestine"
      }&from=${startDate}&to=${endDate}&sources=${source}&apiKey=${
        process.env.REACT_APP_NEWS_API_KEY
      }`;
      const gnewsApiUrl = `https://gnews.io/api/v4/search?q=${
        keyword || "Palestine"
      }&from=${startDate}&to=${endDate}&token=${
        process.env.REACT_APP_GNEWS_API_KEY
      }`;

      const [newsResponse, gnewsResponse] = await Promise.all([
        fetch(newsApiUrl),
        fetch(gnewsApiUrl),
      ]);

      const newsData = await newsResponse.json();
      const gnewsData = await gnewsResponse.json();

      // Merge articles from both APIs
      const mergedArticles = [...newsData.articles, ...gnewsData.articles];
      setArticles(mergedArticles);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchArticles();
  };

  return (
    <div className="App">
      <h1>War News</h1>

      <form onSubmit={handleFilterSubmit}>
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          type="text"
          placeholder="Source (e.g., BBC)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <button type="submit">Filter</button>
      </form>

      {loading ? <p>Loading...</p> : null}

      <div className="articles">
        {articles.map((article, index) => (
          <div key={index} className="article">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
