import React, { useState, useEffect } from 'react';
import { Button, Table, NavLink } from 'reactstrap';
import { NavLink as Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getArticleComments } from "app/entities/comment/comment.reducer";
import { IComment } from "app/shared/model/comment.model";

export const CommentSection = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const commentList = useAppSelector(state => state.comment.entities);
  const loading = useAppSelector(state => state.comment.loading);

  useEffect(() => {
    dispatch(getArticleComments(id));
  }, []);

  return (
    <div className="table-responsive">
      {commentList && commentList.length > 0 ? (
        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Comment Text</th>
            </tr>
          </thead>
          <tbody>
            {commentList.map((comment, i) => (
              <tr key={`entity-${i}`} data-cy="entityTable">
                <td>{comment.id}</td>
                <td>{comment.commentText}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        !loading && <div className="alert alert-warning">No Comments found</div>
      )}
    </div>
  );
};

export default CommentSection;