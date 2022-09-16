import React, { useState } from 'react';

import { useAppDispatch } from '../../../../hooks/redux-hooks';
import { ProgramId } from '../../../../training-programs/data-types';
import Button from '../../../UI-elements/Button/Button';
import Modal from '../../../UI-elements/Modal/Modal';
import { programsActions } from '../../../../redux-store/programsSlice';
import { useGetProgram } from '../../../../hooks/programs-hooks/useGetProgram';

interface Props {
  show: boolean;
  id: ProgramId | null;
  onCancel: () => void;
}

const AddWorkoutModal: React.FC<Props> = ({ show, id, onCancel }) => {
  const dispatch = useAppDispatch();

  const program = useGetProgram(id);

  // Get state for InitComponent
  const [initData, setInitData] = useState<any>({});

  const addProgramHandler = async () => {
    if (program) {
      // Get init state
      const initState = program.getInitData(initData);

      // dispatch(
      //   programsActions.add({
      //     id: program.id,
      //     initData: initData,
      //     state: initState,
      //     version: '',
      //   })
      // );
      dispatch(
        programsActions.addThunk({
          id: program.id,
          state: initState,
          initData,
        })
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
        <InitComponent value={initData} onChange={setInitData} />
      </Modal>
    </>
  );
};

export default AddWorkoutModal;
