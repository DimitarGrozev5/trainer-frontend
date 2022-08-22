import {
  populateProgramsArr,
  useAppSelector,
} from "../../../hooks/redux-hooks";

import styles from "./ManagePrograms.module.css";
import Card from "../../UI-elements/Card/Card";
import Input from "../../UI-elements/Input/Input";
import { useState } from "react";
import Button from "../../UI-elements/Button/Button";
import { useSState } from "../../../hooks/useSState";

const ManagePrograms = () => {
  // Get all programs
  const allPrograms = useAppSelector(populateProgramsArr());
  const activePrograms = allPrograms.filter((pr) => pr.active);
  const inactivePrograms = allPrograms.filter((pr) => !pr.active);

  // Handle a search query
  const [query, setQuery, { setStateTo: setQueryTo }] = useSState("");

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
      <Card>
        <h1 className={styles.h1}>Add a new program:</h1>
        <Input
          label="Quick find:"
          type="text"
          value={query}
          onChange={setQuery}
          addClearBtn
        />
        <ul>
          {inactivePrograms.map((p) => (
            <li key={p.id}>{p.id}</li>
          ))}
        </ul>
      </Card>
    </>
  );
};

export default ManagePrograms;
