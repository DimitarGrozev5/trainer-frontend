import ReactDOM from "react-dom";
import React from "react";

import styles from "./LoadingSpinner.module.css";

interface Props {
  asOverlay?: boolean;
  minimize?: boolean;
  centerPage?: boolean;
}

const LoadingSpinner: React.FC<Props> = ({
  asOverlay,
  minimize,
  centerPage,
}) => {
  let classes = "";
  if (asOverlay) {
    classes = styles["loading-spinner__overlay"];
  }
  if (minimize) {
    classes = styles["loading-spinner__mini"];
  }
  if (centerPage) {
    classes = styles["loading-spinner__center-page"];
  }

  const content = (
    <div className={classes}>
      <div className={styles["lds-dual-ring"]}></div>
    </div>
  );

  const targetELement = document.getElementById("modal-root");

  if ((asOverlay || centerPage) && targetELement) {
    return ReactDOM.createPortal(content, targetELement);
  }

  return content;
};

export default LoadingSpinner;
