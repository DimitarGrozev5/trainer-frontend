import { useState } from "react";
import {
  populateProgramsArr,
  useAppSelector,
} from "../../../hooks/redux-hooks";

import styles from "./ManagePrograms.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import {
  ProgramId,
  TrainingProgram,
} from "../../../training-programs/data-types";
import Button from "../../UI-elements/Button/Button";
import ViewWorkoutDescModal from "./ViewWorkoutDescModal/ViewWorkoutDescModal";
import { useSState } from "../../../hooks/useSState";
import AddWorkoutModal from "./AddWorkoutModal/AddWorkoutModal";

const match = (query: string) => (program: TrainingProgram) => {
  return (
    program.name.toLowerCase().includes(query.toLowerCase()) ||
    program.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    program.longDesc.toLowerCase().includes(query.toLowerCase())
  );
};

const ManagePrograms = () => {
  // Get all programs
  const allPrograms = useAppSelector(populateProgramsArr());
  const activePrograms = allPrograms.filter((pr) => pr.active);
  const inactivePrograms = allPrograms.filter((pr) => !pr.active);

  // Handle a search query
  const [query, setQuery] = useState("");

  // Handle modals
  const [descModal, setDescModal, { setStateTo: setDescModalTo }] = useSState<{
    id: ProgramId;
    title: string;
    desc: string;
  } | null>(null);

  const [addModal, setAddModal, { setStateTo: setAddModalTo }] =
    useSState<ProgramId | null>(null);

  // Get state for InitComponent
  const [initState, setInitState] = useState<any>({});

  const descToAddHandler = () => {
    setDescModal(null);
    descModal && setAddModal(descModal.id);
  };

  const addProgramHandler = () => {
    setAddModal(null);
    console.log("Add program");
    // Get InitState
    console.log(initState);
    

    // Update Redux
  };

  return (
    <>
      <ViewWorkoutDescModal
        show={!!descModal}
        data={descModal}
        onClose={setDescModalTo(null)}
        onAdd={descToAddHandler}
      />
      <AddWorkoutModal
        show={!!addModal}
        id={addModal}
        onCancel={setAddModalTo(null)}
        onAdd={addProgramHandler}
        initState={initState}
        setInitState={setInitState}
      />
      <Card>
        <h1 className={styles.h1}>Your Programs:</h1>
        <ul>
          {activePrograms.map((p) => (
            <li key={p.id}>{p.id}</li>
          ))}
        </ul>
      </Card>
      <Card className={styles["new-programs"]}>
        <h1 className={styles.h1}>Add a new program:</h1>
        <Input
          label="Quick find:"
          type="text"
          value={query}
          onChange={setQuery}
          addClearBtn
        />
        <ul className={styles["inactive-programs"]}>
          {inactivePrograms.filter(match(query)).map((p) => (
            <li key={p.id} className={styles["new-program"]}>
              <div className={styles["new_program__desc"]}>
                <h2>{p.name}</h2>
                <p>{p.shortDesc}</p>
              </div>
              <div className={styles["new_program__actions"]}>
                <Button
                  onClick={setDescModalTo({
                    id: p.id,
                    title: p.name,
                    desc: p.longDesc,
                  })}
                  circle
                >
                  i
                </Button>
                <Button onClick={setAddModalTo(p.id)} circle>
                  +
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default ManagePrograms;
