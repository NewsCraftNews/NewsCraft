import React, { useState, useEffect } from 'react';
import { Button, Table, NavLink } from 'reactstrap';
import { NavLink as Link, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const UserHome = () => {
//   const dispatch = useAppDispatch();
//
//   const { category_name } = useParams<'category_name'>();
//
//   const newsArticleList = useAppSelector(state => state.newsArticle.entities);
//   const loading = useAppSelector(state => state.newsArticle.loading);

//   useEffect(() => {
//     if(category_name) dispatch(getEntitiesOfCategory(category_name));
//     else dispatch(getEntities({}));
//   }, []);

  return (
    <div>
      <h1 id="user-home-heading">Welcome to your User Homepage!</h1>
      <p>This is your landing page when you first login to your account!</p>
    </div>
  );
};

export default UserHome;
