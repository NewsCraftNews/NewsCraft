import React, { useState, useEffect } from 'react';
import { Button, Table, NavLink } from 'reactstrap';
import { NavLink as Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities, getEntitiesOfCategory } from "app/entities/news-article/news-article.reducer";
import { INewsArticle } from "app/shared/model/news-article.model";

export const ArticleList = () => {
  const dispatch = useAppDispatch();

  const { category_name } = useParams<'category_name'>();

  const newsArticleList = useAppSelector(state => state.newsArticle.entities);
  const loading = useAppSelector(state => state.newsArticle.loading);

  useEffect(() => {
    if(category_name) dispatch(getEntitiesOfCategory(category_name));
    else dispatch(getEntities({}));
  }, [category_name]);

  const handleSyncList = () => {
    if(category_name) dispatch(getEntitiesOfCategory(category_name));
    else dispatch(getEntities({}));
  };

  return (
    <div>
      <h1 id="news-article-heading" data-cy="NewsArticleHeading">
        News Articles
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
        </div>
      </h1>
      <div className="table-responsive">
        {newsArticleList && newsArticleList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th><h3>Title</h3></th>
                <th><h3>Article Text</h3></th>
              </tr>
            </thead>
            <tbody>
              {newsArticleList.map((newsArticle, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <h4>
                      <NavLink tag={Link} to={`/article/${newsArticle.id}`} activeClassName="active">{newsArticle.title}</NavLink>
                    </h4>
                  </td>
                  <td>{newsArticle.articleText.substring(0, 1000)}</td>
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
