import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IPicture } from 'app/shared/model/picture.model';
import { getEntities as getPictures } from 'app/entities/picture/picture.reducer';
import { IUserProfile } from 'app/shared/model/user-profile.model';
import { getEntities as getUserProfiles } from 'app/entities/user-profile/user-profile.reducer';
import { ICategory } from 'app/shared/model/category.model';
import { getEntities as getCategories } from 'app/entities/category/category.reducer';
import { INewsArticle } from 'app/shared/model/news-article.model';
import { getEntity, updateEntity, createEntity, reset } from './news-article.reducer';

export const NewsArticleUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const pictures = useAppSelector(state => state.picture.entities);
  const userProfiles = useAppSelector(state => state.userProfile.entities);
  const categories = useAppSelector(state => state.category.entities);
  const newsArticleEntity = useAppSelector(state => state.newsArticle.entity);
  const loading = useAppSelector(state => state.newsArticle.loading);
  const updating = useAppSelector(state => state.newsArticle.updating);
  const updateSuccess = useAppSelector(state => state.newsArticle.updateSuccess);

  const handleClose = () => {
    navigate('/news-article');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getPictures({}));
    dispatch(getUserProfiles({}));
    dispatch(getCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.timePosted = convertDateTimeToServer(values.timePosted);

    const entity = {
      ...newsArticleEntity,
      ...values,
      categories: mapIdList(values.categories),
      picture: pictures.find(it => it.id.toString() === values.picture.toString()),
      author: userProfiles.find(it => it.id.toString() === values.author.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          timePosted: displayDefaultDateTime(),
        }
      : {
          ...newsArticleEntity,
          timePosted: convertDateTimeFromServer(newsArticleEntity.timePosted),
          picture: newsArticleEntity?.picture?.id,
          author: newsArticleEntity?.author?.id,
          categories: newsArticleEntity?.categories?.map(e => e.id.toString()),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="newsCraftApp.newsArticle.home.createOrEditLabel" data-cy="NewsArticleCreateUpdateHeading">
            Create or edit a News Article
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? <ValidatedField name="id" required readOnly id="news-article-id" label="ID" validate={{ required: true }} /> : null}
              <ValidatedField label="Title" id="news-article-title" name="title" data-cy="title" type="text" />
              <ValidatedField label="Article Text" id="news-article-articleText" name="articleText" data-cy="articleText" type="text" />
              <ValidatedField
                label="Time Posted"
                id="news-article-timePosted"
                name="timePosted"
                data-cy="timePosted"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField label="Likes" id="news-article-likes" name="likes" data-cy="likes" type="text" />
              <ValidatedField id="news-article-picture" name="picture" data-cy="picture" label="Picture" type="select">
                <option value="" key="0" />
                {pictures
                  ? pictures.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.caption}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField id="news-article-author" name="author" data-cy="author" label="Author" type="select">
                <option value="" key="0" />
                {userProfiles
                  ? userProfiles.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.login}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField label="Categories" id="news-article-categories" data-cy="categories" type="select" multiple name="categories">
                <option value="" key="0" />
                {categories
                  ? categories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.name}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/news-article" replace color="info">
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

export default NewsArticleUpdate;
