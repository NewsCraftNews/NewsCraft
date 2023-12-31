import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { INewsArticle } from 'app/shared/model/news-article.model';
import { getEntities } from './news-article.reducer';

export const NewsArticle = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const newsArticleList = useAppSelector(state => state.newsArticle.entities);
  const loading = useAppSelector(state => state.newsArticle.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="news-article-heading" data-cy="NewsArticleHeading">
        News Articles
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
          <Link to="/news-article/new" className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create a new News Article
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {newsArticleList && newsArticleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Article Text</th>
                <th>Time Posted</th>
                <th>Likes</th>
                <th>Picture</th>
                <th>Author</th>
                <th>Categories</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {newsArticleList.map((newsArticle, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`/news-article/${newsArticle.id}`} color="link" size="sm">
                      {newsArticle.id}
                    </Button>
                  </td>
                  <td>{newsArticle.title}</td>
                  <td>{newsArticle.articleText}</td>
                  <td>
                    {newsArticle.timePosted ? <TextFormat type="date" value={newsArticle.timePosted} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{newsArticle.likes}</td>
                  <td>{newsArticle.picture ? <Link to={`/picture/${newsArticle.picture.id}`}>{newsArticle.picture.caption}</Link> : ''}</td>
                  <td>{newsArticle.author ? <Link to={`/user-profile/${newsArticle.author.id}`}>{newsArticle.author.login}</Link> : ''}</td>
                  <td>
                    {newsArticle.categories
                      ? newsArticle.categories.map((val, j) => (
                          <span key={j}>
                            <Link to={`/category/${val.id}`}>{val.name}</Link>
                            {j === newsArticle.categories.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : "bruh"}
                  </td>
                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/news-article/${newsArticle.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`/news-article/${newsArticle.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`/news-article/${newsArticle.id}/delete`}
                        color="danger"
                        size="sm"
                        data-cy="entityDeleteButton"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No News Articles found</div>
        )}
      </div>
    </div>
  );
};

export default NewsArticle;
