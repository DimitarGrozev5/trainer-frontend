import React, { useState } from 'react';

import {
  populateProgram,
  useAppDispatch,
  useAppSelector,
  voidGetter,
} from '../../../../hooks/redux-hooks';
import {
  ProgramId,
  TrainingProgram,
} from '../../../../training-programs/data-types';
import Button from '../../../UI-elements/Button/Button';
import Modal from '../../../UI-elements/Modal/Modal';
import { programsActions } from '../../../../redux-store/programsSlice';

interface Props {
  show: boolean;
  id: ProgramId | null;
  onCancel: () => void;
}

const AddWorkoutModal: React.FC<Props> = ({ show, id, onCancel }) => {
  const dispatch = useAppDispatch();

  const getter = id ? populateProgram(id) : voidGetter;
  const program = useAppSelector<TrainingProgram<ProgramId> | void>(getter);

  // Get state for InitComponent
  const [initState, setInitState] = useState<any>({});

  const addProgramHandler = async () => {
    if (program) {
      // Get init data
      const initData = program.getInitData(initState);

      dispatch(
        programsActions.add({ id: program.id, state: initData, version: '' })
      );
    }

    onCancel();
  };

  const btns = (
    <>
      <Button onClick={onCancel} plain>
        Cancel
      </Button>
      <Button onClick={addProgramHandler} plain>
        Add
      </Button>
    </>
  );

  // Set the output to dummy modal, so an exiting animation will play
  const { name, InitComponent } = program || {
    name: '',
    InitComponent: ({ value, onChange }) => <></>,
  };

  return (
    <>
      <Modal
        title={'Add ' + name}
        show={show}
        buttons={btns}
        onClose={onCancel}
      >
        <InitComponent value={initState} onChange={setInitState} />
      </Modal>
    </>
  );
};

export default AddWorkoutModal;
