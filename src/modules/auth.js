//action
import { createAction, handleActions } from "redux-actions";
import produce from "immer";
import createRequestThunk from "lib/createRequestThunk";
import * as api from "../api/auth";
import createActionTypes from "lib/createActionTypes";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes("auth/LOGIN");
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createActionTypes("auth/REGISTER");

  // 클라이언트에서만 사용하면 createAction
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, name, value }) => ({
    form, // 여기는 register, login 들어오고
    name, //id, pw, pass confirm 들어오고
    value, //real value가 들어옴
  })
);
export const initForm = createAction(INITIALIZE_FORM, (form) => form);

// 서버에서 req, res 필요하면 Thunk사용
export const login = createRequestThunk(LOGIN, api.login);
export const register = createRequestThunk(REGISTER, api.register);

//state
const init = {
  register: {
    username: "",
    password: "",
    passwordConfirm: "",
  },
  login: {
    username: "",
    password: "",
  },
  auth: null,
  authError: null,
};

//reducer
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, name, value } }) =>
      // 前のstate　これからのstate
      produce(state, (draft) => {
        draft[form][name] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: init[form],
      authError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
  },
  init
);

export default auth;
