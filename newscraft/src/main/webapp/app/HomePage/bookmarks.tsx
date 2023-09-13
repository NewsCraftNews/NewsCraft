import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Table } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBookMark } from 'app/shared/model/book-mark.model';
import { getEntities, getUserSpecificEntities } from 'app/entities/book-mark/book-mark.reducer';

export const Bookmarks = () => {
  const dispatch = useAppDispatch();

  const loggedInUser = useAppSelector(state => state.authentication.account.login);
  const bookMarkList = useAppSelector(state => state.bookMark.entities);
  const loading = useAppSelector(state => state.bookMark.loading);

  useEffect(() => {
    dispatch(getUserSpecificEntities(loggedInUser));
  }, []);

  /* IDEA!
   * the idea worked and is amazing
   * HOWEVER, the delete dialog leads you to the entities page, which is bad bad - users should not be able to see that page
   */
  return (
    <div>
      <h2 id="book-mark-heading" data-cy="BookMarkHeading">
        Saved Bookmarks
        <div className="d-flex justify-content-end">
{/*           <Button className="me-2" color="info" disabled={true}> */}
{/*             <FontAwesomeIcon icon="sync" spin={loading} /> Refresh list */}
{/*           </Button> */}
          <span>&nbsp;</span>
        </div>
      </h2>
      <div className="table-responsive">
        {bookMarkList && bookMarkList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th><h3>Links To</h3></th>
                <th />
              </tr>
            </thead>
            <tbody>
              {bookMarkList.map((bookMark, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>{bookMark.linksTo ? <Link to={`/article/${bookMark.linksTo.id}`}>{bookMark.linksTo.title}</Link> : ''}</td>
                  <td className="text-end">
                    <Button tag={Link} to={`/book-mark/${bookMark.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                      <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                    </Button>
                  </td>
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
