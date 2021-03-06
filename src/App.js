import HeaderContainer from "containers/HeaderContainer";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
import ReadPost from "./pages/ReadPost";
import Register from "./pages/Register";
import WritePost from "./pages/WritePost";

function App() {
  //login
  //register
  //write
  //list
  //post
  return (
    <>
      <HeaderContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PostList />} exact />
        <Route path="/@:username" element={<PostList />} exact />
        <Route path="/@:username/:postId" element={<ReadPost />} />
        <Route path="/write" element={<WritePost />} />
      </Routes>
    </>
  );
}

export default App;
