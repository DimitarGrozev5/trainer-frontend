import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

interface Props {
  show: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<Props> = ({ show, message, onClose, onConfirm }) => {
  return (
    <Modal
      show={show}
      title="Confirm"
      onClose={onClose}
      buttons={
        <>
          <Button onClick={onClose} plain>
            Cancel
          </Button>
          <Button onClick={onConfirm} plain>
            Confirm
          </Button>
        </>
      }
    >
      {message}
    </Modal>
  );
};

export default ConfirmModal;
