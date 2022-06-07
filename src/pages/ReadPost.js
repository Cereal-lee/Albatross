import { deletePost } from "api/post";
import EditAndDeleteButton from "components/post/EditAndDeleteButton";
import Viewer from "components/post/Viewer";
import { readPost, unloadPost } from "modules/post";
import { setOriginalPost } from "modules/write";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PostList from "./PostList";

function ReadPost() {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const history = useNavigate();
  const { post, error, loading, user } = useSelector(
    ({ post, loading, user }) => ({
      post: post.post,
      error: post.error,
      loading: loading["post/READ"],
      user: user.user,
    })
  );

  const ownPost = (user && user._id) === (post && post.user._id);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history("/write");
  };

  const onDelete = async () => {
    try {
      await deletePost(postId);
      history("/");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dispatch(readPost(postId));
    return () => dispatch(unloadPost());
  }, [dispatch, postId]);

  return (
    <>
      <Viewer
        post={post}
        error={error}
        loading={loading}
        actionButtons={
          ownPost && <EditAndDeleteButton onEdit={onEdit} onDelete={onDelete} />
        }
      />
      <PostList postId={postId}></PostList>
    </>
  );
}

export default ReadPost;
