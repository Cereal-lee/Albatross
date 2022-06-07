import { handleActions } from "redux-actions";
import { createAction } from "redux-actions";

const START = "loading/START";
const FINISH = "loading/FINISH";

export const start = createAction(START, (reqType) => reqType);
export const finish = createAction(FINISH, (reqType) => reqType);

const init = {};

const loading = handleActions(
  {
    [START]: (state, action) => ({ ...state, [action.payload]: true }),
    [FINISH]: (state, action) => ({ ...state, [action.payload]: false }),
  },
  init
);

export default loading;
