import Card from "../../UI-elements/Card/Card";
import styles from "./ManagePrograms.module.css";

const ManagePrograms = () => {
  // 

  return (
    <>
      <Card>
        <h1 className={styles.h1}>Your Programs:</h1>
      </Card>
      <Card>
        <h1 className={styles.h1}>Add a new program:</h1>
      </Card>
    </>
  );
};

export default ManagePrograms;
