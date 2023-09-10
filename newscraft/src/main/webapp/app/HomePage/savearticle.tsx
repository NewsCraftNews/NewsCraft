import React, { useState, useEffect } from 'react';
import { Button, ButtonToggle } from 'reactstrap';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IBookMark } from 'app/shared/model/book-mark.model';
import { INewsArticle } from "app/shared/model/news-article.model";
import { getUserSpecificEntity, createUserBookmarkEntity, deleteEntity } from 'app/entities/book-mark/book-mark.reducer';

export interface IArticleProps {
  article: INewsArticle;
};

export const BookmarkButton = (props: IArticleProps) => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  const login = useAppSelector(state => state.authentication.account.login);
  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const bookMarkEntity = useAppSelector(state => state.bookMark.entity);
  const loading = useAppSelector(state => state.bookMark.loading);

  const [toggle, setToggle] = useState(bookMarkEntity);

  useEffect(() => {
    dispatch(getUserSpecificEntity({login, id}));
  }, [login, id]);

  useEffect(() => {
    var newToggleVal: boolean = loading ? false : bookMarkEntity;
    setToggle(newToggleVal);
  });

  const handleClick = () => {
    if(bookMarkEntity.id === undefined){
      // if the bookmark doesn't exist then save
      const entity = {
        linksTo: props.article,
      };
      dispatch(createUserBookmarkEntity({login, entity}));
    }
    else {
      dispatch(deleteEntity(bookMarkEntity.id));
    }
  };

// it looks ugly now BUT IT WORKS!
  return ( isAuthenticated ?
    <Button className="me-2" color="info" onClick={handleClick} active={toggle}>
      <FontAwesomeIcon icon={faBookmark} />
    </Button>
    :
    <span>&nbsp;</span>
  );
};

export default BookmarkButton;
