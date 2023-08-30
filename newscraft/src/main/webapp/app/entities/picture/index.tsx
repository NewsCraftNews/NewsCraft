import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Picture from './picture';
import PictureDetail from './picture-detail';
import PictureUpdate from './picture-update';
import PictureDeleteDialog from './picture-delete-dialog';

const PictureRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Picture />} />
    <Route path="new" element={<PictureUpdate />} />
    <Route path=":id">
      <Route index element={<PictureDetail />} />
      <Route path="edit" element={<PictureUpdate />} />
      <Route path="delete" element={<PictureDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default PictureRoutes;
