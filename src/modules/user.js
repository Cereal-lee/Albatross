import createRequestThunk from "lib/createRequestThunk";
import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";
import * as api from "../api/auth";

const { default: createActionTypes } = require("lib/createActionTypes");

const TEMP_SET_USER = "user/TEMP_SET_USER";
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createActionTypes("user/CHECK");
const LOGOUT = "user/LOGOUT";

export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);
export const check = createRequestThunk(CHECK, api.check);
export const logout = createRequestThunk(LOGOUT, api.logout);

const init = {
  user: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_USER]: (state, { payload: user }) => ({ ...state, user }),
    [CHECK_SUCCESS]: (state, { payload: user }) => ({
      ...state,
      user,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: checkError }) => ({
      ...state,
      user: null,
      checkError,
    }),
    [LOGOUT]: (state) => ({ ...state, user: null }),
  },
  init
);
