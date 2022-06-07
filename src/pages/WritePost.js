import Responsive from "components/common/Responsive";
import Editor from "components/post/Editor";
import PostActionButton from "components/post/PostActionButton";
import TagBox from "components/post/TagBox";
import { changeField, initialize, updatePost, writePost } from "modules/write";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function WritePost() {
  const dispatch = useDispatch();
  const { title, body, tags, post, postError, originalPostId } = useSelector(
    ({ write }) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    })
  );
  const history = useNavigate();

  const onChange = useCallback(
    (payload) => {
      dispatch(changeField(payload));
    },
    [dispatch]
  );

  const onPublish = () => {
    if (originalPostId) {
      dispatch(updatePost({ title, body, tags, id: originalPostId }));
      return;
    }
    dispatch(writePost({ title, body, tags }));
  };

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);

  useEffect(() => {
    if (post) {
      const {
        _id,
        user: { username },
      } = post;
      history(`/@${username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [post, postError, history]);

  return (
    <Responsive>
      <Editor onChange={onChange} title={title} body={body} />
      <TagBox onChangeTag={onChange} tags={tags} />
      <PostActionButton onPublish={onPublish} isEdit={!!originalPostId} />
    </Responsive>
  );
}

export default WritePost;
