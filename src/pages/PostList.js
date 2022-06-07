import Responsive from "components/common/Responsive";
import Posts from "components/post/Posts";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import qs from "qs";
import { fetchPostList } from "modules/postList";
import PaginationContainer from "containers/PaginationContainer";

const PostListBlock = styled(Responsive)`
  margin-top: 1rem;
  display: flex;
  margin-left: 1rem;
`;

function PostList({ postId }) {
  const location = useLocation();
  const { username } = useParams();
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ postList, loading, user }) => ({
      posts: postList.posts,
      error: postList.error,
      loading: loading["postList/POST_LIST"],
      user: user.user,
    })
  );

  useEffect(() => {
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    dispatch(fetchPostList({ username, tag, page }));
  }, [dispatch, username, location.search]);

  if (postId) {
    return (
      <Posts
        loading={loading}
        error={error}
        posts={posts}
        showBtn={user}
        postId={postId}
      />
    );
  } else {
    return (
      <>
        <PostListBlock></PostListBlock>
        <Posts loading={loading} error={error} posts={posts} showBtn={user} />
        <PaginationContainer />
      </>
    );
  }
}

export default PostList;
