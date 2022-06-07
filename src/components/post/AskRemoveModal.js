import Modal from "components/common/Modal";
import React from "react";

function AskRemoveModal({ visible, onConfirm, onCancel }) {
  const title = "削除";
  const description = "削除しますか？";

  return (
    <Modal
      visible={visible}
      title={title}
      description={description}
      onConfirm={onConfirm}
      onCancel={onCancel}
    />
  );
}

export default AskRemoveModal;
