import Pagination from "components/post/Pagination";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import qs from "qs";

function PaginationContainer() {
  const location = useLocation();
  const { lastPage, posts, loading } = useSelector(({ postList, loading }) => ({
    lastPage: postList.lastPage,
    posts: postList.posts,
    loading: loading["postList/POST_LIST"],
  }));
  const { username } = useParams();

  if (!posts || loading) return null;

  const { tag, page = 1 } = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  return (
    <Pagination
      page={parseInt(page, 10)}
      tag={tag}
      lastPage={lastPage}
      username={username}
    />
  );
}

export default PaginationContainer;
