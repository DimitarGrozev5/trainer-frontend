import { useParams } from "react-router-dom";
import { populateProgram, useAppSelector } from "../../../hooks/redux-hooks";
import {
  ProgramId,
  SessionComponent,
} from "../../../training-programs/data-types";

const ActiveSession = () => {
  const programId = useParams().programId as ProgramId;

  const program = useAppSelector(populateProgram(programId));

  let Component: SessionComponent = () => <></>;
  if (program && program.SessionComponent) {
    Component = program.SessionComponent;
  }

  return <Component program={program} />;
};

export default ActiveSession;
