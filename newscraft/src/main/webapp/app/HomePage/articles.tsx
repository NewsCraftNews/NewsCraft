import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities } from "app/entities/news-article/news-article.reducer";
import { INewsArticle } from "app/shared/model/news-article.model";

export const ArticleList = () => {
  const dispatch = useAppDispatch();

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
      <h1 id="news-article-heading" data-cy="NewsArticleHeading">
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
                <th>Title</th>
                <th>Article Text</th>
                <th>Author</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {newsArticleList.map((newsArticle, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{newsArticle.title}</td>
                  <td>{newsArticle.articleText.substring(0, 250)}</td>
                  <td>{newsArticle.author ? <Link to={`/user-profile/${newsArticle.author.id}`}>{newsArticle.author.login}</Link> : ''}</td>

                  <td className="text-end">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`/news-article/${newsArticle.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
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

export default ArticleList;
