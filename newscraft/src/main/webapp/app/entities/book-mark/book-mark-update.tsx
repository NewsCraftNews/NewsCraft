import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { INewsArticle } from 'app/shared/model/news-article.model';
import { getEntities as getNewsArticles } from 'app/entities/news-article/news-article.reducer';
import { IBookMark } from 'app/shared/model/book-mark.model';
import { getEntity, updateEntity, createEntity, reset } from './book-mark.reducer';

export const BookMarkUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const newsArticles = useAppSelector(state => state.newsArticle.entities);
  const bookMarkEntity = useAppSelector(state => state.bookMark.entity);
  const loading = useAppSelector(state => state.bookMark.loading);
  const updating = useAppSelector(state => state.bookMark.updating);
  const updateSuccess = useAppSelector(state => state.bookMark.updateSuccess);

  const handleClose = () => {
    navigate('/book-mark');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getUserProfiles({}));
    dispatch(getNewsArticles({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...bookMarkEntity,
      ...values,
      createdBy: userProfiles.find(it => it.id.toString() === values.createdBy.toString()),
      linksTo: newsArticles.find(it => it.id.toString() === values.linksTo.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          ...bookMarkEntity,
          createdBy: bookMarkEntity?.createdBy?.id,
          linksTo: bookMarkEntity?.linksTo?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="newsCraftApp.bookMark.home.createOrEditLabel" data-cy="BookMarkCreateUpdateHeading">
            Create or edit a Book Mark
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="book-mark-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField id="book-mark-createdBy" name="createdBy" data-cy="createdBy" label="Created By" type="select">
                <option value="" key="0" />
                {userProfiles
                  ? userProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="book-mark-linksTo" name="linksTo" data-cy="linksTo" label="Links To" type="select">
                <option value="" key="0" />
                {newsArticles
                  ? newsArticles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.title}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/book-mark" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default BookMarkUpdate;
