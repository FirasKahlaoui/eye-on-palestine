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
  const [page, setPage] = useState(1); 
  const [pageSize] = useState(10); 
  const [totalResults, setTotalResults] = useState(0);

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
    setArticles([]);
    setPage(1); 
    fetchArticles();
  };

  const handleLoadMore = () => {
    setPage(page + 1); 
  };

  return (
    <div className="App">
      <h1 className="text-3xl font-bold mb-5">War News</h1>

      <form onSubmit={handleFilterSubmit} className="mb-5">
        <input
          type="text"
          placeholder="Keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="m-2 p-2 border rounded"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="m-2 p-2 border rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="m-2 p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Source (e.g., BBC)"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="m-2 p-2 border rounded"
        />
        <button
          type="submit"
          className="p-3 m-5 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Filter
        </button>
      </form>

      {loading ? <p>Loading...</p> : null}

      <div className="content">
        <div className="articles-container">
          <ArticleList articles={articles} />
          {totalResults > articles.length && (
            <button
              onClick={handleLoadMore}
              disabled={loading}
              className="p-3 m-5 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
