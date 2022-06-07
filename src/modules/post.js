import createActionTypes from "lib/createActionTypes";
import createRequestThunk from "lib/createRequestThunk";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import * as api from "../api/post";

const [READ, READ_SUCCESS, READ_FAILURE] = createActionTypes("post/READ");
const UNLOAD_POST = "post/UNLOAD_POST";

export const readPost = createRequestThunk(READ, api.readPost);
export const unloadPost = createAction(UNLOAD_POST);

const init = {
  post: null,
  error: null,
};

const post = handleActions(
  {
    [READ_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
      error: null,
    }),
    [READ_FAILURE]: (state, { payload: error }) => ({
      ...state,
      post: null,
      error,
    }),
    [UNLOAD_POST]: () => init,
  },
  init
);

export default post;
