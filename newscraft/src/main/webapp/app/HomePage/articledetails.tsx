import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './articlepictures.scss'

import { APP_DATE_TIME_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { TextFormat } from 'react-jhipster';

import { getEntity } from 'app/entities/news-article/news-article.reducer';
import { INewsArticle } from "app/shared/model/news-article.model";
import { CommentSection } from "app/HomePage/articlecomments"

export const Article = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const newsArticleEntity = useAppSelector(state => state.newsArticle.entity);

  /*
   * The News Article Page idea:
   * TITLE
   * Posted on TIME, DAY
   * Written by PERSON
   * PICTURE
   * CAPTION
   * ARTICLE_TEXT
   */
  return (
    <div className="article-padding">
      <h1 data-cy="NewsArticleHeading">
        {newsArticleEntity.title}
      </h1>
      <p>
        Posted on&nbsp;
        {newsArticleEntity.timePosted ? <TextFormat value={newsArticleEntity.timePosted} type="date" format={APP_DATE_TIME_FORMAT} /> : null}
        <br />
         <div className="article-picture">
         <img src="content/images/Money.jpeg" alt="Article Photo" />
          </div>
        Written by {newsArticleEntity.author ? newsArticleEntity.author.login : ''}
      </p>
      <p>{newsArticleEntity.articleText}</p>
      <CommentSection />
    </div>
  );
};

export default Article;
