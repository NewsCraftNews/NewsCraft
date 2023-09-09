import React, {useState, useEffect} from 'react';
import {Button, Table, NavLink, NavItem} from 'reactstrap';
import {NavLink as Link, useParams} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {useAppDispatch, useAppSelector} from 'app/config/store';
import {getArticleComments} from "app/entities/comment/comment.reducer";
import {IComment} from "app/shared/model/comment.model";
import {TextFormat} from "react-jhipster";
import {APP_DATE_TIME_FORMAT, APP_TIMESTAMP_FORMAT} from "app/config/constants";
import {BoxProps} from "@mui/material";

export const CommentSection = () => {
  const dispatch = useAppDispatch();

  const {id} = useParams<'id'>();

  const commentList = useAppSelector(state => state.comment.entities);
  const loading = useAppSelector(state => state.comment.loading);

  useEffect(() => {
    dispatch(getArticleComments(id));
  }, []);

  return (
  <div><h1>Comments</h1>
    {commentList.map((comment, i) => (
      <div>
        <p key={`category-${comment.id}`}>
          Written by&nbsp;
          {comment.author.login}
          <br/>
          Posted on&nbsp;
          {<TextFormat value={comment.timePosted} type="date" format={APP_TIMESTAMP_FORMAT}/>}
          <br/>
          {comment.commentText}
        </p>
      </div>))}
  </div>
//     <div className="table-responsive">
//       {commentList && commentList.length > 0 ? (
//         <Table responsive>
//           {/*<thead>*/}
//           {/*  <tr>*/}
//           {/*    <th>ID</th>*/}
//           {/*    <th>Comment Text</th>*/}
//           {/*  </tr>*/}
//           {/*</thead>*/}
//           <tbody>
//             {commentList.map((comment, i) => (
//               <tr key={`entity-${i}`} data-cy="entityTable">
//                 <td>{comment.author.login}</td>
//                 <td>{<TextFormat value={comment.timePosted} type="date" format={APP_TIMESTAMP_FORMAT} />}</td>
//                 <td>{comment.commentText}</td>
//               </tr>
//             ))}
//           </tbody>
//         </Table>
//       ) : (
//         !loading && <div className="alert alert-warning">No Comments found</div>
//       )}
//     </div>
  )};

export default CommentSection;
