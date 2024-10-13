import React from 'react';
import ArticleItem from './ArticleItem';

const ArticleList = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleItem key={article.url} article={article} />
      ))}
    </div>
  );
};

export default ArticleList;
