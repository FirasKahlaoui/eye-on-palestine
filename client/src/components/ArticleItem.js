import React from "react";

const ArticleItem = ({ article }) => {
  return (
    <div className="article">
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Read more
      </a>
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="article-img"
        />
      )}
    </div>
  );
};

export default ArticleItem;
