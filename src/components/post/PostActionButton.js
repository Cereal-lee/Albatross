import Button from "components/common/Button";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const PostActionButtonBlock = styled.div`
  margin-top: 1rem;
  margin-bottom: 3rem;
  button + button {
    margin-left: 0.5rem;
  }
`;

const StyledButton = styled(Button)`
  height: 2.2rem;
  & + & {
    margin-left: 1rem;
  }
  min-width: 112px;
`;

function PostActionButton({ onPublish, isEdit }) {
  const history = useNavigate();
  return (
    <PostActionButtonBlock>
      <StyledButton
        onClick={() => {
          history(-1);
        }}
      >
        キャンセル
      </StyledButton>
      <StyledButton teal onClick={onPublish}>
        {!isEdit ? "登録" : "修正"}
      </StyledButton>
    </PostActionButtonBlock>
  );
}

export default PostActionButton;
