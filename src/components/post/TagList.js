import palette from "lib/palette";
import React from "react";
import styled from "styled-components";

const TagListBox = styled.div`
  display: flex;
  margin-bottom: 1rem;
`;

const TagItemBox = styled.div`
  & + & {
    margin-left: 0.5rem;
  }
  background-color: ${palette.teal[0]};
  border-radius: 2rem;
  color: ${palette.gray[7]};
  font-weight: 500;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover {
    background-color: ${palette.teal[1]};
  }
`;

const TagItem = React.memo(({ tag, onRemove }) => (
  <TagItemBox onClick={() => onRemove(tag)}>#{tag}</TagItemBox>
));

const TagList = React.memo(({ tags, onRemove }) => (
  <TagListBox>
    {tags.map((tag) => (
      <TagItem tag={tag} key={tag} onRemove={onRemove} />
    ))}
  </TagListBox>
));

export default TagList;
