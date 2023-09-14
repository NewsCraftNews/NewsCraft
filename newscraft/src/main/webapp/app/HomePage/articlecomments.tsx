import React, { useState, useEffect } from 'react';
import { Button, Table, NavLink, NavItem } from 'reactstrap';
import { NavLink as Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getArticleComments } from "app/entities/comment/comment.reducer";
import { IComment } from "app/shared/model/comment.model";
import { TextFormat } from "react-jhipster";
import { APP_DATE_TIME_FORMAT, APP_TIMESTAMP_FORMAT } from "app/config/constants";
import BoxComponent from "app/HomePage/comment";
import CommentBox from "app/HomePage/commentbox";
import {INewsArticle} from "app/shared/model/news-article.model";
import { IArticleProps } from "app/HomePage/savearticle";

export const CommentSection = (props: IArticleProps) => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const commentList = useAppSelector(state => state.comment.entities);
  const loading = useAppSelector(state => state.comment.loading);

  useEffect(() => {
    dispatch(getArticleComments(id));
  }, []);

  return (
  <div><h2>&nbsp;&nbsp;<strong><u>Comments</u></strong></h2>
    <div style={{margin: '1rem'}}>
    {isAuthenticated && <CommentBox article={props.article}/>}
    {commentList && commentList.length > 0 ? (commentList.map((comment, i) => (
      <div id={i} {{padding: '0px'}}>
        <BoxComponent comments={comment} key={i} />
        <br/>
      </div>)))
      : (
      !loading && <div className="alert alert-secondary">No Comments Yet</div>
    )}
    </div>
  </div>
  )};

export default CommentSection;
