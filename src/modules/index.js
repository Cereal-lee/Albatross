import { combineReducers } from "redux";
import auth from "./auth";
import loading from "./loading";
import user from "./user";
import write from "./write";
import post from "./post";
import postList from "./postList";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다. 単一責任の原則
const rootReducer = combineReducers({
  auth,
  loading,
  user,
  write,
  post,
  postList,
});

export default rootReducer;
