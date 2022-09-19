import ReactDOM from 'react-dom';

import styles from './LoadingBar.module.css';

const LoadingBar = () => {
  return ReactDOM.createPortal(
    <div className={styles.bar}>
      <div className={styles.runner}></div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default LoadingBar;
