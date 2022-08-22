import { useState } from "react";
import {
  populateProgramsArr,
  useAppSelector,
} from "../../../hooks/redux-hooks";

import styles from "./ManagePrograms.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import { TrainingProgram } from "../../../training-programs/data-types";
import Button from "../../UI-elements/Button/Button";

const match = (query: string) => (program: TrainingProgram) => {
  // TODO: change to name & description
  return (
    program.name.toLowerCase().includes(query.toLowerCase()) ||
    program.shortDesc.toLowerCase().includes(query.toLowerCase()) ||
    program.longDesc.toLowerCase().includes(query.toLowerCase())
  );
};

const ManagePrograms = () => {
  // TODO: map redux state to Programs functions
  // Get all programs
  const allPrograms = useAppSelector(populateProgramsArr());
  const activePrograms = allPrograms.filter((pr) => pr.active);
  const inactivePrograms = allPrograms.filter((pr) => !pr.active);

  // Handle a search query
  const [query, setQuery] = useState("");

  return (
    <>
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
              <div>
                <h2>{p.name}</h2>
                <p>{p.shortDesc}</p>
              </div>
              <div>
                <Button>i</Button>
                <Button>+</Button>
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default ManagePrograms;
