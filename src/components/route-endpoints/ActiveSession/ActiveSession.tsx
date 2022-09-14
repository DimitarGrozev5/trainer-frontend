import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetProgram } from '../../../hooks/programs-hooks/useGetProgram';
import { useAppDispatch } from '../../../hooks/redux-hooks';
import { programsActions } from '../../../redux-store/programsSlice';
import {
  ProgramAchievedMap,
  ProgramId,
  TPActive,
} from '../../../training-programs/data-types';
import Button from '../../UI-elements/Button/Button';
import Card from '../../UI-elements/Card/Card';
import ConfirmModal from '../../UI-elements/Modal/ConfirmModal';

const ActiveSession = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get program id from url params
  const programId = useParams().programId as ProgramId;

  // Get program data and methods
  const programOrNull = useGetProgram(programId);

  // Handle Session exit
  const [showConfirmExit, setShowConfirmExit] = useState(false);

  // Handle session achived
  const [achieved, setAchieved] = useState<
    ProgramAchievedMap[ProgramId] | false
  >(false);

  // Handle invalid id
  if (programOrNull === null) {
    return (
      <>
        <Card>Invalid program! Go back and select a proper program!</Card>
        <Card>
          <Button to="/">Home</Button>
        </Card>
      </>
    );
  }
  if (!programOrNull.active) {
    return (
      <>
        <Card>
          The program isn't active! Go to the Programs Manager to start doing
          it!
        </Card>
        <Card>
          <Button to="/manage-programs">Manage Programs</Button>
        </Card>
      </>
    );
  }

  // If the previous checks have passed, then the program is not null and is active, so it's safe to coerce
  const program = programOrNull as TPActive;

  // Get program component
  const Component = program.SessionComponent;

  // Handler for ending the session
  const endSession = (confirmed: boolean) => async () => {
    // If the exit is not confirmed, show modal
    if (!confirmed) {
      setShowConfirmExit(true);
      return;
    }

    // If the goal is achieved generate next state
    if (achieved) {
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
      <Component program={program} onAchievedChanged={setAchieved} />
      <Card>
        <Button onClick={endSession(!!achieved)} stretch>
          End Session
        </Button>
      </Card>
    </>
  );
};

export default ActiveSession;
