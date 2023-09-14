import './home.scss';
import './grids.css';
import './articleElementStyle.css'
import './style.css'
import './styles2.css'
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

import { Row, Col, Alert } from 'reactstrap';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import HomeArticleBox from './home-article-box';
import News from './BreakingNewsComponent';
import WeatherApp from "app/modules/home/WeatherApp";
import SmallArticleRight from "app/modules/home/SmallArticles/SmallArticleRight";
import SmallArticle2 from "app/modules/home/SmallArticles/SmallArticle2";
import SmallArticle3 from "app/modules/home/SmallArticles/SmallArticle3";
import SmallArticle4 from "app/modules/home/SmallArticles/SmallArticle4";
import SmallArticle5 from "app/modules/home/SmallArticles/SmallArticle5";
import SmallArticle6 from "app/modules/home/SmallArticles/SmallArticle6";
import { getTopEntities } from 'app/entities/news-article/news-article.reducer';

export const Home = () => {
  const dispatch = useAppDispatch();

  const newsArticleList = useAppSelector(state => state.newsArticle.entities);
  const loading = useAppSelector(state => state.newsArticle.loading);

  useEffect(() => {
    dispatch(getTopEntities(3));
  }, []);

  return (
    <Row>
      <h1 style={{fontSize: '65px'}}><strong>Welcome, Reader!</strong></h1>
      <br />
      <br />
      <Col md="8">
        <Row>
          {newsArticleList.map((oneArticle, i) => <HomeArticleBox article={oneArticle} />)}
        </Row>
      </Col>
      <Col md="4">
        <div>
          <div className="widget">
            <div className="widget_title widget_black"><strong>More News</strong></div>
            <div style={{paddingLeft: "4%"}}><WeatherApp /></div>
          </div>
          <div className="widget">
            <div className="widget_title widget_black"><strong>More News</strong></div>
            <SmallArticleRight />
            <SmallArticle2/>
            <SmallArticle3/>
            <SmallArticle4/>
            <SmallArticle5/>
            <SmallArticle6/>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Home;



