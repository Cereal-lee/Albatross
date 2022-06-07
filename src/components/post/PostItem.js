import palette from "lib/palette";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SubInfo from "./SubInfo";

const PostItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 3rem;

  & + & {
    border-top: 1px solid ${palette.gray[3]};
  }

  &:first-child {
    padding-top: 0;
  }

  h4 {
    &:hover {
      color: ${palette.gray[5]};
    }
  }
`;

function PostItem({ post }) {
  const { title, publishedDate, user, _id } = post;

  return (
    <PostItemBlock>
      <h4><Link to={`/@${user.username}/${_id}`}>{title}</Link></h4>
      <SubInfo username={user.username} publishedDate={publishedDate} />
    </PostItemBlock>
  );
}

export default PostItem;
