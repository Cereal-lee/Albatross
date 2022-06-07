import palette from "lib/palette";
import React from "react";
import styled from "styled-components";
import Button from "./Button";

const ModalBlock = styled.div`
  width: 280px;
  background: white;
  padding: 1.5rem;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  p {
    margin-bottom: 3rem;
    font-size: 0.8rem;
    color: ${palette.gray[8]};
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-left: 0.75rem;
  }
  .confirm {
    background-color: red;
  }
`;

const FullScreen = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Modal({
  visible,
  title,
  description,
  confirmText = "確認",
  cancelText = "チャンネル",
  onConfirm,
  onCancel,
}) {
  if (!visible) return null;

  return (
    <FullScreen>
      <ModalBlock>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
          <StyledButton onClick={onConfirm} classname="confirm">
            {confirmText}
          </StyledButton>
        </div>
      </ModalBlock>
    </FullScreen>
  );
}

export default Modal;
