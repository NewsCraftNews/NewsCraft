import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBookMark } from 'app/shared/model/book-mark.model';
import { getEntities } from 'app/entities/book-mark/book-mark.reducer';

export const Bookmarks = () => {
  const dispatch = useAppDispatch();

  const bookMarkList = useAppSelector(state => state.bookMark.entities);
  const loading = useAppSelector(state => state.bookMark.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  return (
    <div>
      <h2 id="book-mark-heading" data-cy="BookMarkHeading">
        Saved Bookmarks
        <div className="d-flex justify-content-end">
          <Button className="me-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list
          </Button>
        </div>
      </h2>
      <div className="table-responsive">
        {bookMarkList && bookMarkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>Links To</th>
              </tr>
            </thead>
            <tbody>
              {bookMarkList.map((bookMark, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{bookMark.linksTo ? <Link to={`/article/${bookMark.linksTo.id}`}>{bookMark.linksTo.title}</Link> : ''}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Bookmarks found</div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;
