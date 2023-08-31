import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './book-mark.reducer';

export const BookMarkDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const bookMarkEntity = useAppSelector(state => state.bookMark.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="bookMarkDetailsHeading">Book Mark</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{bookMarkEntity.id}</dd>
          <dt>Created By</dt>
          <dd>{bookMarkEntity.createdBy ? bookMarkEntity.createdBy.login : ''}</dd>
          <dt>Links To</dt>
          <dd>{bookMarkEntity.linksTo ? bookMarkEntity.linksTo.title : ''}</dd>
        </dl>
        <Button tag={Link} to="/book-mark" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/book-mark/${bookMarkEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default BookMarkDetail;
