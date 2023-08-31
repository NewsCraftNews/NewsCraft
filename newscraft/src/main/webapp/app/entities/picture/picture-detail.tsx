import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import {} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './picture.reducer';

export const PictureDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const pictureEntity = useAppSelector(state => state.picture.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="pictureDetailsHeading">Picture</h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">ID</span>
          </dt>
          <dd>{pictureEntity.id}</dd>
          <dt>
            <span id="imageURL">Image URL</span>
          </dt>
          <dd>{pictureEntity.imageURL}</dd>
          <dt>
            <span id="caption">Caption</span>
          </dt>
          <dd>{pictureEntity.caption}</dd>
        </dl>
        <Button tag={Link} to="/picture" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/picture/${pictureEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

export default PictureDetail;
