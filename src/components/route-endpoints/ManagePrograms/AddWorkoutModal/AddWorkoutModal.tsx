import React, { useState } from "react";

import {
  populateProgram,
  useAppDispatch,
  useAppSelector,
  voidGetter,
} from "../../../../hooks/redux-hooks";
import {
  ProgramId,
  TrainingProgram,
} from "../../../../training-programs/data-types";
import Button from "../../../UI-elements/Button/Button";
import Modal from "../../../UI-elements/Modal/Modal";
import {
  programsActions,
  ProgramState,
} from "../../../../redux-store/programsSlice";
import { useHttpClient } from "../../../../hooks/useHttpClient";
import LoadingSpinner from "../../../UI-elements/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../../UI-elements/Modal/ErrorModal";

interface Props {
  show: boolean;
  id: ProgramId | null;
  onCancel: () => void;
}

const AddWorkoutModal: React.FC<Props> = ({ show, id, onCancel }) => {
  const dispatch = useAppDispatch();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const getter = id ? populateProgram(id) : voidGetter;
  const workout = useAppSelector<TrainingProgram | void>(getter);

  // Get state for InitComponent
  const [initState, setInitState] = useState<any>({});

  const addProgramHandler = async () => {
    if (workout) {
      // Get init data
      const initData = workout.getInitData(initState);

      // Send request
      let response: ProgramState[] = [];
      try {
        const res = await sendRequest("/", {
          body: { id: workout.id, state: initData },
        });

        response = [{ id: res.id, active: true, state: res.state }];
      } catch (err) {
        console.log(err);
      }

      // Update Redux
      dispatch(
        programsActions.updateProgramsState(
          // [{ id: workout.id, active: true, state: initData } as ProgramState,]
          response
        )
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
  const { name, InitComponent } = workout || {
    name: "",
    InitComponent: ({ value, onChange }) => <></>,
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal show={!!error} error={error} onClose={clearError} />

      <Modal
        title={"Add " + name}
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
