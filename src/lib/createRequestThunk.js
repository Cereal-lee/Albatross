import { finish, start } from "modules/loading";

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return (param) => async (dispatch) => {
    dispatch({ type });
    try {
      dispatch(start(type));
      const response = await request(param);
      dispatch({
        type: SUCCESS,
        payload: response.data,
        meta: response,
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
    dispatch(finish(type));
  };
}
