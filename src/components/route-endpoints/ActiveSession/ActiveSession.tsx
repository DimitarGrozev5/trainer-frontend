import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  populateProgram,
  useAppDispatch,
  useAppSelector,
} from "../../../hooks/redux-hooks";
import { useHttpClient } from "../../../hooks/useHttpClient";
import { programsActions } from "../../../redux-store/programsSlice";
import {
  ProgramId,
  SessionComponent,
} from "../../../training-programs/data-types";
import Button from "../../UI-elements/Button/Button";
import Card from "../../UI-elements/Card/Card";
import LoadingSpinner from "../../UI-elements/LoadingSpinner/LoadingSpinner";
import ConfirmModal from "../../UI-elements/Modal/ConfirmModal";
import ErrorModal from "../../UI-elements/Modal/ErrorModal";

const ActiveSession = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, error, clearError, sendRequest } = useHttpClient();

  const programId = useParams().programId as ProgramId;

  const program = useAppSelector(populateProgram(programId));

  let Component: SessionComponent = () => <></>;
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
    if (achieved) {
      // If the goal is achieved, get next state and exit
      const nextState = program.getNextState(program.state, achieved);
      try {
        const response = await sendRequest(`/${program.id}`, {
          body: { id: program.id, state: nextState },
          method: "PATCH",
        });

        dispatch(
          programsActions.updateProgramsState([
            { id: response.id, active: true, state: response.state },
          ])
        );
      } catch (err) {
        console.log(err);
      }
      // setShowInfoModal(true);
    }

    navigate("/");
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      <ErrorModal show={!!error} error={error} onClose={clearError} />

      <ConfirmModal
        show={showConfirmExit}
        message={"The session is not over. Are you sure you want to exit?"}
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
        <Button onClick={endSession(achieved)} stretch>
          End Session
        </Button>
      </Card>
    </>
  );
};

export default ActiveSession;
