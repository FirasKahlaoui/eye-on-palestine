import React from "react";

const ArticleItem = ({ article }) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>{article.title}</h2>
      <p>{article.description}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        Read more
      </a>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          style={{ width: "100%", height: "auto" }}
        />
      )}
    </div>
  );
};

export default ArticleItem;
