import { useParams } from "react-router-dom";
import { populateProgram, useAppSelector } from "../../../hooks/redux-hooks";
import { ProgramId } from "../../../training-programs/data-types";

const ActiveSession = () => {
  // const programId = useParams().programId;

  // const selector = programId ? populateProgram(programId) : () => null;

  // const program = useAppSelector(selector);
  return <div>test</div>;
};

export default ActiveSession;
