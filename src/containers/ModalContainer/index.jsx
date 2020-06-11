import React from "react";
import { Modal } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { closeDialog } from "../../redux/actions/dialog";

const ModalContainer = () => {
  const { open, body, title } = useSelector((s) => s.dialog);
  const dispatch = useDispatch();
  const handleCancel = (e) => {
    dispatch(closeDialog());
  };
  return (
    <Modal footer={[]} visible={open} title={title} onCancel={handleCancel}>
      {body}
    </Modal>
  );
};

export default ModalContainer;
