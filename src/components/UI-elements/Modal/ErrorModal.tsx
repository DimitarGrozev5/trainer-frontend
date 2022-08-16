import React from "react";
import Button from "../Button/Button";
import Modal from "./Modal";

interface Props {
  show: boolean;
  error: string;
  onClose: () => void;
}

const ErrorModal: React.FC<Props> = ({ show, error, onClose }) => {
  return (
    <Modal
      show={show}
      title="Error"
      onClose={onClose}
      buttons={
        <Button onClick={onClose} plain>
          Close
        </Button>
      }
    >
      {error}
    </Modal>
  );
};

export default ErrorModal;
