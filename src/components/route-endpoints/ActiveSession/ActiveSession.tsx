import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProgram } from '../../../hooks/programs-hooks/useGetProgram';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { programsActions } from '../../../redux-store/programsSlice';
import {
  ProgramId,
  SessionComponent,
  TrainingProgram,
} from '../../../training-programs/data-types';
import Button from '../../UI-elements/Button/Button';
import Card from '../../UI-elements/Card/Card';
import ConfirmModal from '../../UI-elements/Modal/ConfirmModal';

const ActiveSession = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const programId = useParams().programId as ProgramId;

  const program = useGetProgram(programId);

  let Component: SessionComponent<ProgramId> = () => <></>;
  if (program && program.SessionComponent) {
    Component = program.SessionComponent;
  }

  // Handle Session exit
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  // const [showInfoModal, setShowInfoModal] = useState(false);

  const [achieved, setAchieved] = useState<any>(false);

  const endSession = (confirmed: boolean) => async () => {
    // If the exit is not confirmed, show modal
    if (!confirmed) {
      setShowConfirmExit(true);
      return;
    }

    // If the goal is achieved generate next state
    if (achieved && program && program.version) {
      // If the goal is achieved, get next state and exit
      const nextState = program.getNextState(program.state, achieved);
      dispatch(
        programsActions.update({
          id: program.id,
          state: nextState,
          achieved,
          version: program.version,
        })
      );
      // setShowInfoModal(true);
    }

    navigate('/');
  };

  return (
    <>
      <ConfirmModal
        show={showConfirmExit}
        message={'The session is not over. Are you sure you want to exit?'}
        onClose={setShowConfirmExit.bind(null, false)}
        onConfirm={endSession(true)}
      />
      {/* <Modal
        show={showInfoModal}
        title={"Exiting"}
        buttons={<Button onClick={() => navigate("/")}>OK</Button>}
        onClose={() => navigate("/")}
      >
        Saving data and exiting!
      </Modal> */}
      {/* TODO: a hacky solution that will probably go away after a refactoring */}
      <Component
        program={program as TrainingProgram<ProgramId>}
        onAchievedChanged={setAchieved}
      />
      <Card>
        <Button onClick={endSession(achieved)} stretch>
          End Session
        </Button>
      </Card>
    </>
  );
};

export default ActiveSession;
