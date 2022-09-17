import React from 'react';
import ReactDOM from 'react-dom';
import { Transition } from 'react-transition-group';

import styles from './OverlayModal.module.css';

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
  onClose: () => void;
  children: React.ReactNode;
}

const OverlayModal: React.FC<Props> = ({ show, onClose, children }) => {
  const targetElement = document.getElementById('modal-root');
  if (targetElement) {
    return ReactDOM.createPortal(
      <Transition in={show} timeout={200} mountOnEnter unmountOnExit>
        {(state) => (
          <>
            <Overlay onClose={onClose} transitionState={styles[state]} />
            <div className={`${styles.modal} ${styles[state]}`}>{children}</div>
          </>
        )}
      </Transition>,
      targetElement
    );
  } else {
    return <></>;
  }
};

export default OverlayModal;
