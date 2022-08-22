import React from "react";
import {
  populateProgram,
  useAppSelector,
  voidGetter,
} from "../../../../hooks/redux-hooks";
import {
  ProgramId,
  TrainingProgram,
} from "../../../../training-programs/data-types";
import Button from "../../../UI-elements/Button/Button";
import Modal from "../../../UI-elements/Modal/Modal";

interface Props {
  show: boolean;
  id: ProgramId | null;
  onCancel: () => void;
  onAdd: () => void;
}

const AddWorkoutModal: React.FC<Props> = ({ show, id, onCancel, onAdd }) => {
  const getter = id ? populateProgram(id) : voidGetter;
  const workout = useAppSelector<TrainingProgram | void>(getter);

  const btns = (
    <>
      <Button onClick={onCancel} plain>
        Cancel
      </Button>
      <Button onClick={onAdd} plain>
        Add
      </Button>
    </>
  );

  // Set the output to dummy modal, so an exiting animation will play
  const { name, InitComponent } = workout || {
    name: "",
    InitComponent: ({ onSubmit }) => <></>,
  };

  return (
    <Modal title={"Add " + name} show={show} buttons={btns} onClose={onCancel}>
      <InitComponent onSubmit={} />
    </Modal>
  );
};

export default AddWorkoutModal;
