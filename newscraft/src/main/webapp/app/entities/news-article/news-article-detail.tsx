import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './news-article.reducer';

export const NewsArticleDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const newsArticleEntity = useAppSelector(state => state.newsArticle.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="newsArticleDetailsHeading">News Article</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{newsArticleEntity.id}</dd>
          <dt>
            <span id="title">Title</span>
          </dt>
          <dd>{newsArticleEntity.title}</dd>
          <dt>
          <div className="brand-icon">
            <img src="content/images/Article photo.png" alt="Logo" />
           </div>
            <span id="articleText">Article Text</span>
          </dt>
          <dd>{newsArticleEntity.articleText}</dd>
          <dt>
            <span id="timePosted">Time Posted</span>
          </dt>
          <dd>
            {newsArticleEntity.timePosted ? <TextFormat value={newsArticleEntity.timePosted} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="likes">Likes</span>
          </dt>
          <dd>{newsArticleEntity.likes}</dd>
          <dt>Picture</dt>
          <dd>{newsArticleEntity.picture ? newsArticleEntity.picture.caption : ''}</dd>
          <dt>Author</dt>
          <dd>{newsArticleEntity.author ? newsArticleEntity.author.login : ''}</dd>
          <dt>Categories</dt>
          <dd>
            {newsArticleEntity.categories
              ? newsArticleEntity.categories.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.name}</a>
                    {newsArticleEntity.categories && i === newsArticleEntity.categories.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/news-article" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/news-article/${newsArticleEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default NewsArticleDetail;
