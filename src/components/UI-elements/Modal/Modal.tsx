import React from "react";
import ReactDOM from "react-dom";
import { Transition } from "react-transition-group";

import styles from "./Modal.module.css";

interface OverlayProps {
  transitionState: string;
  onClose: () => void;
}

const Overlay: React.FC<OverlayProps> = ({ onClose, transitionState }) => {
  return (
    <div
      className={`${styles.overlay} ${transitionState}`}
      onClick={onClose}
    ></div>
  );
};

interface Props {
  show: boolean;
  title: string;
  children: React.ReactNode;
  buttons: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<Props> = ({
  show,
  onClose,
  title,
  buttons,
  children,
}) => {
  const targetElement = document.getElementById("modal-root");
  if (targetElement) {
    return ReactDOM.createPortal(
      <Transition in={show} timeout={200} mountOnEnter unmountOnExit>
        {(state) => (
          <>
            <Overlay onClose={onClose} transitionState={styles[state]} />
            <div className={`${styles.modal} ${styles[state]}`}>
              <header>
                <h1>{title}</h1>
              </header>
              <section>{children}</section>
              <footer>{buttons}</footer>
            </div>
          </>
        )}
      </Transition>,
      targetElement
    );
  } else {
    return <></>;
  }
};

export default Modal;
