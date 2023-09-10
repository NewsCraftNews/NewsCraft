import axios from 'axios';
import { createAsyncThunk, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { IQueryParams, createEntitySlice, EntityState, serializeAxiosError } from 'app/shared/reducers/reducer.utils';
import { IBookMark, defaultValue } from 'app/shared/model/book-mark.model';

const initialState: EntityState<IBookMark> = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export interface IUserBookmarkParams {
  login: string;
  id: string | number;
}

export interface ISaveBookmarkParams {
  login: string;
  entity: IBookMark;
}

const apiUrl = 'api/book-marks';

// Actions

export const getUserSpecificEntities = createAsyncThunk('bookMark/fetch_entity_list', async (login: string) => {
  const requestUrl = `api/user/${login}/bookmarks?cacheBuster=${new Date().getTime()}`;
  return axios.get<IBookMark[]>(requestUrl);
});

export const getEntities = createAsyncThunk('bookMark/fetch_entity_list', async ({ page, size, sort }: IQueryParams) => {
  const requestUrl = `${apiUrl}?cacheBuster=${new Date().getTime()}`;
  return axios.get<IBookMark[]>(requestUrl);
});

export const getUserSpecificEntity = createAsyncThunk(
  'bookMark/fetch_entity',
  async ({login, id}: IUserBookmarkParams) => {
    const requestUrl = `api/user/${login}/bookmark?articleid=${id}`;
    return axios.get<IBookMark>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const getEntity = createAsyncThunk(
  'bookMark/fetch_entity',
  async (id: string | number) => {
    const requestUrl = `${apiUrl}/${id}`;
    return axios.get<IBookMark>(requestUrl);
  },
  { serializeError: serializeAxiosError }
);

export const createUserBookmarkEntity = createAsyncThunk(
  'bookMark/create_entity',
  async (params: ISaveBookmarkParams) => {
    const requestUrl = `api/user/${params.login}/bookmarks`;
    const result = await axios.post<IBookMark>(requestUrl, cleanEntity(params.entity));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const createEntity = createAsyncThunk(
  'bookMark/create_entity',
  async (entity: IBookMark, thunkAPI) => {
    const result = await axios.post<IBookMark>(apiUrl, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const updateEntity = createAsyncThunk(
  'bookMark/update_entity',
  async (entity: IBookMark, thunkAPI) => {
    const result = await axios.put<IBookMark>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const partialUpdateEntity = createAsyncThunk(
  'bookMark/partial_update_entity',
  async (entity: IBookMark, thunkAPI) => {
    const result = await axios.patch<IBookMark>(`${apiUrl}/${entity.id}`, cleanEntity(entity));
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

export const deleteEntity = createAsyncThunk(
  'bookMark/delete_entity',
  async (id: string | number, thunkAPI) => {
    const requestUrl = `${apiUrl}/${id}`;
    const result = await axios.delete<IBookMark>(requestUrl);
    thunkAPI.dispatch(getEntities({}));
    return result;
  },
  { serializeError: serializeAxiosError }
);

// slice

export const BookMarkSlice = createEntitySlice({
  name: 'bookMark',
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
      .addMatcher(isFulfilled(getUserSpecificEntities), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isFulfilled(getEntities), (state, action) => {
        const { data } = action.payload;

        return {
          ...state,
          loading: false,
          entities: data,
        };
      })
      .addMatcher(isFulfilled(createEntity, updateEntity, partialUpdateEntity), (state, action) => {
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
      .addMatcher(isPending(createEntity, updateEntity, partialUpdateEntity, deleteEntity), state => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.updating = true;
      });
  },
});

export const { reset } = BookMarkSlice.actions;

// Reducer
export default BookMarkSlice.reducer;
