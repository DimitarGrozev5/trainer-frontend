import React from "react";
import { ProgramId } from "../../../../training-programs/data-types";
import Button from "../../../UI-elements/Button/Button";
import Modal from "../../../UI-elements/Modal/Modal";

interface Props {
  show: boolean;
  data: {
    id: ProgramId;
    title: string;
    desc: string;
  } | null;
  onClose: () => void;
  onAdd: () => void;
}

const ViewWorkoutDescModal: React.FC<Props> = ({
  show,
  data,
  onClose,
  onAdd,
}) => {
  const title = data ? data.title : "";
  const desc = data ? data.desc : "";

  const btns = (
    <>
      <Button onClick={onClose} plain>Close</Button>
      <Button onClick={onAdd} plain>Add</Button>
    </>
  );
  return (
    <Modal title={title} show={show} buttons={btns} onClose={onClose}>
      {desc}
    </Modal>
  );
};

export default ViewWorkoutDescModal;
