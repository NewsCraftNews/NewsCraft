import React, {useState, useEffect} from 'react';
import {getEntities} from "app/entities/news-article/news-article.reducer";
import {INewsArticle} from "app/shared/model/news-article.model";

export const ArticleList = () => {
  return (
    <div>
      <h1>Articles pewpew</h1>
      <section id = "section">
        <div id = 'posts'> </div>
      </section>
    </div>
  );
};

export default ArticleList;
