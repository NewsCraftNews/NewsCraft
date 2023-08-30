import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import UserProfile from './user-profile';
import Comment from './comment';
import BookMark from './book-mark';
import NewsArticle from './news-article';
import Category from './category';
import Picture from './picture';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="user-profile/*" element={<UserProfile />} />
        <Route path="comment/*" element={<Comment />} />
        <Route path="book-mark/*" element={<BookMark />} />
        <Route path="news-article/*" element={<NewsArticle />} />
        <Route path="category/*" element={<Category />} />
        <Route path="picture/*" element={<Picture />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
