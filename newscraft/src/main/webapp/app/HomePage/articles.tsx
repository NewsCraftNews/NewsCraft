import React, {useState, useEffect} from 'react';
import {Button, Table, NavLink} from 'reactstrap';
import {NavLink as Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getEntities, getEntitiesOfCategory} from "app/entities/news-article/news-article.reducer";
import {INewsArticle} from "app/shared/model/news-article.model";
import {IComment} from "app/shared/model/comment.model";

export const ArticleList = () => {
    const dispatch = useAppDispatch();

    const {category_name} = useParams<'category_name'>();

    const newsArticleList = useAppSelector(state => state.newsArticle.entities);
    const loading = useAppSelector(state => state.newsArticle.loading);

    useEffect(() => {
        if (category_name) dispatch(getEntitiesOfCategory(category_name));
        else dispatch(getEntities({}));
    }, [category_name]);

    return (
      <div>
        <h1 id="news-article-heading" data-cy="NewsArticleHeading" className="text-info-emphasis">
          <u>{category_name.charAt(0).toUpperCase() + category_name.slice(1)} Articles</u>
          <div className="d-flex justify-content-end">
            <span>&nbsp;</span>
          </div>
        </h1>
        {newsArticleList.map((newsArticle, i) => (
          <h3 key={i}>
            <Link to={`/article/${newsArticle.id}`}>{newsArticle.title}</Link>
            <br/>
            <br/>
          </h3>
        ))}
      </div>
    );
};


export default ArticleList;
