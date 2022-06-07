import Responsive from "components/common/Responsive";
import palette from "lib/palette";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import SubInfo from "./SubInfo";

const ViewerBlock = styled(Responsive)`
  margin-top: 3rem;
`;
const PostHeader = styled.div`
  border-bottom: 1px solid ${palette.gray[4]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.15rem;
  color: ${palette.gray[9]};
`;

const Tags = styled.div`
  display: inline-block;
  & + & {
    margin-left: 0.5rem;
  }
  background-color: ${palette.teal[0]};
  border-radius: 2rem;
  color: ${palette.gray[6]};
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${palette.teal[1]};
  }
`;

function Viewer({ post, error, loading, actionButtons }) {
  if (error) return <ViewerBlock>Error</ViewerBlock>;

  if (loading || !post) return null;

  const { title, user, publishedDate, tags } = post;

  return (
    <ViewerBlock>
      <PostHeader>
        <h1>{title}</h1>
        <SubInfo username={user.username} publishedDate={publishedDate} />
      </PostHeader>
      {actionButtons}
      <PostContent dangerouslySetInnerHTML={{ __html: post.body }} />
      <div>
        {tags.map((tag) => (
          <Tags key={tag}>
            <Link to={`/?tag=${tag}`}>{tag}</Link>
          </Tags>
        ))}
      </div>
    </ViewerBlock>
  );
}

export default Viewer;
