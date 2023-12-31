import axios from 'axios';
import {createAsyncThunk, isFulfilled, isPending, isRejected} from '@reduxjs/toolkit';

import {cleanEntity} from 'app/shared/util/entity-utils';
import {IQueryParams, createEntitySlice, EntityState, serializeAxiosError} from 'app/shared/reducers/reducer.utils';
import {IComment, defaultValue} from 'app/shared/model/comment.model';

const initialState: EntityState<IComment> = {
    loading: false,
    errorMessage: null,
    entities: [],
    entity: defaultValue,
    updating: false,
    updateSuccess: false,
};

const apiUrl = 'api/comments';

// Actions

export const getArticleComments = createAsyncThunk(
    'comment/fetch_entity_list',
    async (id: string | number) => {
        const requestUrl = `api/news-articles/${id}/comments`;
        return axios.get<IComment[]>(requestUrl);
    },
    {serializeError: serializeAxiosError}
);

export interface ICommentCreate {
    login: string;
    entity: IComment;
}

export const createComment = createAsyncThunk(
    'comment/create_entity',
    async (params: ICommentCreate, thunkAPI) => {
        const requestUrl = `api/comments/${params.login}/article`;
        const result = await axios.post<IComment>(requestUrl, cleanEntity(params.entity));
        thunkAPI.dispatch(getArticleComments(params.entity.article.id));
        return result;
    },
    {serializeError: serializeAxiosError}
);

export const getEntities = createAsyncThunk('comment/fetch_entity_list', async ({page, size, sort}: IQueryParams) => {
    const requestUrl = `${apiUrl}?cacheBuster=${new Date().getTime()}`;
    return axios.get<IComment[]>(requestUrl);
});

export const getEntity = createAsyncThunk(
    'comment/fetch_entity',
    async (id: string | number) => {
        const requestUrl = `${apiUrl}/${id}`;
        return axios.get<IComment>(requestUrl);
    },
    {serializeError: serializeAxiosError}
);

export const createEntity = createAsyncThunk(
    'comment/create_entity',
    async (entity: IComment, thunkAPI) => {
        const result = await axios.post<IComment>(apiUrl, cleanEntity(entity));
        thunkAPI.dispatch(getEntities({}));
        return result;
    },
    {serializeError: serializeAxiosError}
);

export const updateEntity = createAsyncThunk(
    'comment/update_entity',
    async (entity: IComment, thunkAPI) => {
        const result = await axios.put<IComment>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
        thunkAPI.dispatch(getEntities({}));
        return result;
    },
    {serializeError: serializeAxiosError}
);

export const partialUpdateEntity = createAsyncThunk(
    'comment/partial_update_entity',
    async (entity: IComment, thunkAPI) => {
        const result = await axios.patch<IComment>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
        thunkAPI.dispatch(getEntities({}));
        return result;
    },
    {serializeError: serializeAxiosError}
);

export const deleteEntity = createAsyncThunk(
    'comment/delete_entity',
    async (id: string | number, thunkAPI) => {
        const requestUrl = `${apiUrl}/${id}`;
        const result = await axios.delete<IComment>(requestUrl);
        thunkAPI.dispatch(getEntities({}));
        return result;
    },
    {serializeError: serializeAxiosError}
);

// slice

export const CommentSlice = createEntitySlice({
    name: 'comment',
    initialState,
    extraReducers(builder) {
        builder
            .addCase(getEntity.fulfilled, (state, action) => {
                state.loading = false;
                state.entity = action.payload.data;
            })
            .addCase(deleteEntity.fulfilled, state => {
                state.updating = false;
                state.updateSuccess = true;
                state.entity = {};
            })
            .addMatcher(isFulfilled(getEntities), (state, action) => {
                const {data} = action.payload;

                return {
                    ...state,
                    loading: false,
                    entities: data,
                };
            })
            .addMatcher(isFulfilled(getArticleComments), (state, action) => {
                const {data} = action.payload;

                return {
                    ...state,
                    loading: false,
                    entities: data,
                };
            })
            .addMatcher(isFulfilled(createEntity, createComment, updateEntity, partialUpdateEntity), (state, action) => {
                state.updating = false;
                state.loading = false;
                state.updateSuccess = true;
                state.entity = action.payload.data;
            })
            .addMatcher(isPending(getEntities, getEntity), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.loading = true;
            })
            .addMatcher(isPending(createEntity, createComment, updateEntity, partialUpdateEntity, deleteEntity), state => {
                state.errorMessage = null;
                state.updateSuccess = false;
                state.updating = true;
            });
    },
});

export const {reset} = CommentSlice.actions;

// Reducer
export default CommentSlice.reducer;
