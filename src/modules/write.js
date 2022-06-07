import createActionTypes from "lib/createActionTypes";
import createRequestThunk from "lib/createRequestThunk";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import * as api from "../api/post";

const INITIALIZE = "write/INITIALIZE";
const CHANGE_FIELD = "write/CHANGE_FIELD";
const [POST, POST_SUCCESS, POST_FAILURE] = createActionTypes("write/POST");
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE] =
  createActionTypes("write/UPDATE");
const SET_ORIGINAL_POST = "write/SET_ORIGINAL_POST";

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const writePost = createRequestThunk(POST, api.writePost);
export const updatePost = createRequestThunk(UPDATE, api.updatePost);
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

const init = {
  title: "",
  body: "",
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const write = handleActions(
  {
    [INITIALIZE]: (state) => init,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [POST]: (state) => ({ ...state, post: null, postError: null }),
    [POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      postError: null,
    }),
    [POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => ({
      ...state,
      title: post.title,
      body: post.body,
      tags: post.tags,
      originalPostId: post._id,
    }),
    [UPDATE_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      post: null,
      postError,
    }),
  },
  init
);

export default write;
