import Button from "components/common/Button";
import Responsive from "components/common/Responsive";
import React from "react";
import styled from "styled-components";
import PostItem from "./PostItem";

const PostListBlock = styled(Responsive)`
  margin: 0 auto;
  margin-top: 3rem;
`;

const WriteButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

function Posts({ posts, loading, error, showBtn, postId }) {
  if (error) return <>error</>;

  return (
    <PostListBlock>
      <WriteButtonWrapper>
        {showBtn && !postId && (
          <Button teal="true" to="/write">
            新しいポスター
          </Button>
        )}
      </WriteButtonWrapper>
      {!loading && posts && (
        <div>
          {posts.map((post) => (
            <PostItem key={post._id} post={post} />
          ))}
        </div>
      )}
    </PostListBlock>
  );
}

export default Posts;
