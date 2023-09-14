import React, { useState, useEffect } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { ICategory } from 'app/shared/model/category.model';
import { getSomeEntities } from 'app/entities/category/category.reducer';

export const CategoriesMenu = () => {
  const dispatch = useAppDispatch();

  const categoryList = useAppSelector(state => state.category.entities);
  const loading = useAppSelector(state => state.category.loading);

  useEffect(() => {
  // limiting the number of categories to 7
    dispatch(getSomeEntities(7));
  }, []);

  return categoryList.map((category, i) => (
    <NavItem key={`category-${category.id}`}>
      <NavLink tag={Link} to={`/articlelist/${category.name.toLowerCase()}`}
          style={{opacity: 1, fontWeight: 'bold'}}
          className="d-flex align-items-center">
        {category.name}
      </NavLink>
    </NavItem> ))
};

export default CategoriesMenu;
