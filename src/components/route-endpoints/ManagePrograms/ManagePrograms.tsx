import { useState } from "react";
import {
  populateProgramsArr,
  useAppDispatch,
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
import ConfirmModal from "../../UI-elements/Modal/ConfirmModal";
import { programsActions } from "../../../redux-store/programsSlice";

const match = (query: string) => (program: TrainingProgram) => {
  return (
    program.name.toLowerCase().includes(query.toLowerCase()) ||
    program.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    program.longDesc.toLowerCase().includes(query.toLowerCase())
  );
};

const ManagePrograms = () => {
  const dispatch = useAppDispatch();

  // Get all programs and divide them in active and inactive
  const allPrograms = useAppSelector(populateProgramsArr());
  const activePrograms = allPrograms.filter((pr) => pr.active);
  const inactivePrograms = allPrograms.filter((pr) => !pr.active);

  // Handle a search query
  const [query, setQuery] = useState("");

  // Handle modals visibility
  const [descModal, setDescModal, { setStateTo: setDescModalTo }] = useSState<{
    id: ProgramId;
    title: string;
    desc: string;
    new: boolean;
  } | null>(null);

  const [addModal, setAddModal, { setStateTo: setAddModalTo }] =
    useSState<ProgramId | null>(null);

  const descToAddHandler = () => {
    setDescModal(null);
    descModal && setAddModal(descModal.id);
  };

  const [
    showConfirmModal,
    setShowConfirmModal,
    { setStateTo: setShowConfirmModalTo },
  ] = useSState<ProgramId | false>(false);

  // Remove Workout handler
  const removeWorkout =
    (confirmed: boolean, id: ProgramId | undefined = undefined) =>
    async () => {
      if (confirmed) {
        setShowConfirmModal(false);
        if (showConfirmModal) {
          dispatch(programsActions.remove(showConfirmModal));
        }
      } else {
        id && setShowConfirmModal(id);
      }
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
      />
      <ConfirmModal
        show={!!showConfirmModal}
        onClose={setShowConfirmModalTo(false)}
        onConfirm={removeWorkout(true)}
        message="Are tou sure you want to remove this program?"
      />

      <Card>
        <h1 className={styles.h1}>Your Programs:</h1>
        <ul>
          {activePrograms.map((p) => (
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
                    new: false,
                  })}
                  circle
                >
                  i
                </Button>
                <Button onClick={removeWorkout(false, p.id)} circle>
                  X
                </Button>
              </div>
            </li>
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
                    new: true,
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
