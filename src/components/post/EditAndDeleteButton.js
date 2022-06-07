import palette from "lib/palette";
import React, { useState } from "react";
import styled from "styled-components";
import AskRemoveModal from "./AskRemoveModal";

const EditAndDeleteButtonBlock = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
  margin-top: -1.5rem;
`;

const ActionButton = styled.button`
  border: 1px solid black;
  border-radius: 4px;
  outline: none;
  background: none;
  padding: 0.25rem 0.5rem;
  color: ${palette.gray[5]};
  font-size: 1rem;
  cursor: pointer;

  .delete {
    color: red;
  }

  & + & {
    margin-left: 0.25rem;
  }

  &:hover {
    background: ${palette.gray[3]};
    color: ${palette.teal[6]};
  }
`;

function EditAndDeleteButton({ onEdit, onDelete }) {
  const [modal, setModal] = useState(false);

  const onDeleteClick = () => setModal(true);
  const onCancel = () => setModal(false);
  const onConfirm = () => {
    setModal(false);
    console.log(onDelete);
    onDelete();
  };

  return (
    <>
      <EditAndDeleteButtonBlock>
        <ActionButton onClick={onEdit}>修正</ActionButton>
        <ActionButton className="delete" onClick={onDeleteClick}>
          削除
        </ActionButton>
      </EditAndDeleteButtonBlock>
      <AskRemoveModal
        visible={modal}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    </>
  );
}

export default EditAndDeleteButton;
