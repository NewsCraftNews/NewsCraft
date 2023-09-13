import React, { useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import { APP_DATE_TIME_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';
import { TextFormat } from 'react-jhipster';

import { getEntity } from 'app/entities/news-article/news-article.reducer';
import { INewsArticle } from 'app/shared/model/news-article.model';
import { IPicture } from 'app/shared/model/picture.model';
import { CommentSection } from "app/HomePage/articlecomments"
import { BookmarkButton } from "./savearticle"

export const Article = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const newsArticleEntity = useAppSelector(state => state.newsArticle.entity);

  useEffect(() => {
    dispatch(getEntity(id));
  }, [id]);

  useEffect(() => {
    console.log(newsArticleEntity.picture);
    console.log(JSON.stringify(newsArticleEntity.picture));

  }, [newsArticleEntity]);

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
    <div>
      <h1 data-cy="NewsArticleHeading">
        <u>{newsArticleEntity.title}</u>
      </h1>
      <p>
        Posted on&nbsp;
        {newsArticleEntity.timePosted ? <TextFormat value={newsArticleEntity.timePosted} type="date" format={APP_DATE_TIME_FORMAT} /> : null}
        <br />
        Written by {newsArticleEntity.author ? newsArticleEntity.author.login : ''}
      </p>
      <div key={`button-${newsArticleEntity.id}`} className="d-flex justify-content-end">
        <BookmarkButton article={newsArticleEntity} />
      </div>
      {/*<br/>*/}
      {newsArticleEntity && newsArticleEntity.picture && newsArticleEntity.picture.imageURL && (
        <div id="article-image" style={{textAlign: 'center'}}>
          <img src={newsArticleEntity.picture.imageURL} alt={newsArticleEntity.picture.caption} width="60%" />
        </div>
      )}
      <br/>
      <br/>
      <p>{newsArticleEntity.articleText}</p>
      <CommentSection article={newsArticleEntity} />
    </div>
  );
};
export default Article;
