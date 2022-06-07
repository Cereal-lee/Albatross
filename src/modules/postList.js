import createActionTypes from "lib/createActionTypes";
import createRequestThunk from "lib/createRequestThunk";
import { handleActions } from "redux-actions";
import * as api from "../api/post";

const [POST_LIST, POST_LIST_SUCCESS, POST_LIST_FAILURE] =
  createActionTypes("postList/POST_LIST");

export const fetchPostList = createRequestThunk(POST_LIST, api.postList);

const init = {
  posts: null,
  error: null,
  lastPage: 1,
};

const postList = handleActions(
  {
    [POST_LIST_SUCCESS]: (state, { payload: posts, meta: response }) => ({
      ...state,
      posts,
      error: null,
      lastPage: parseInt(response.headers["last-page"], 10),
    }),
    [POST_LIST_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: null,
      error,
    }),
  },
  init
);

export default postList;
