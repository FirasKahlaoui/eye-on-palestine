import React, { useState, useEffect } from "react";
import "./App.css";
import ArticleList from "./components/ArticleList";

function App() {
  const [articles, setArticles] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [source, setSource] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Add page state
  const [pageSize] = useState(10); // Limit results to 10 per page
  const [totalResults, setTotalResults] = useState(0); // Track total articles

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const newsApiUrl = `https://newsapi.org/v2/everything?q=${
        keyword || "Palestine"
      }&from=${startDate}&to=${endDate}&sources=${source}&page=${page}&pageSize=${pageSize}&apiKey=${
        process.env.REACT_APP_NEWS_API_KEY
      }`;
      const gnewsApiUrl = `https://gnews.io/api/v4/search?q=${
        keyword || "Palestine"
      }&from=${startDate}&to=${endDate}&page=${page}&max=${pageSize}&token=${
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
      setArticles((prevArticles) => [...prevArticles, ...mergedArticles]); // Append new articles
      setTotalResults(newsData.totalResults || gnewsData.totalResults); // Update total articles
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setArticles([]); // Clear previous articles on new search
    setPage(1); // Reset page to 1 when filters are applied
    fetchArticles();
  };

  const handleLoadMore = () => {
    setPage(page + 1); // Increment page number when "Load More" is clicked
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

      <div className="content">
        <div className="articles-container">
          <ArticleList articles={articles} />
          {totalResults > articles.length && (
            <button onClick={handleLoadMore} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
