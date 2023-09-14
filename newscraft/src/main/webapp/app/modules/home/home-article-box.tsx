import './home.scss';
import './grids.css';
import './articleElementStyle.css'
import './style.css'
import './styles2.css'

import React from 'react';
import { Link } from 'react-router-dom';
import { TextFormat } from 'react-jhipster';
import { Row, Col, Alert } from 'reactstrap';

import { APP_DATE_TIME_FORMAT } from 'app/config/constants';
import { useAppSelector } from 'app/config/store';

import { INewsArticle } from 'app/shared/model/news-article.model';

export interface IHomeProps {
  article: INewsArticle;
}

export const HomeArticleBox = (props: IHomeProps) => {
  return (
    <div>
      <div className="article-container">
        <h2>{props.article.title}</h2>
        <p className="article-meta">
          Posted on {props.article.timePosted ? <TextFormat value={props.article.timePosted} type="date" format={APP_DATE_TIME_FORMAT} /> : null}
        </p>
        <img className="article-image" src={props.article.picture.imageURL} alt="News Image"/>
          <p className="article-content">
            {props.article.articleText.substring(0, 650)}
          </p>
      </div>
      <br />
    </div>
  );
};

export default HomeArticleBox;
