import { Modal } from "antd";
import { ForwardedRef, forwardRef, useImperativeHandle, useState } from "react";

export interface PopMethods {
  openModal: () => void;
  closeModal: () => void;
}
// eslint-disable-next-line react/display-name
const Pop = forwardRef((props, ref: ForwardedRef<PopMethods>) => {
  useImperativeHandle(ref, () => ({
    openModal: () => {
      setIsModalOpen(true);
    },
    closeModal: () => {
      setIsModalOpen(false);
    },
  }));

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
});
export default Pop;
