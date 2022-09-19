import { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/redux-hooks';
import Button from '../../UI-elements/Button/Button';
import LoadingBar from '../../UI-elements/LoadingBar/LoadingBar';
import ConfirmModal from '../../UI-elements/Modal/ConfirmModal';

import styles from './FullScreenTemplate.module.css';

const FullScreenTemplate = () => {
  // Get loading status
  const isLoading = useAppSelector((state) => state.network.isLoading);
  
  const navigate = useNavigate();
  const path = useLocation().pathname;

  const [goBackModal, setGoBackModal] = useState(false);
  const onCancel = () => {
    setGoBackModal(false);
  };
  const onConfirm = () => {
    setGoBackModal(false);
    navigate('/');
  };

  const goBackHandler = () => setGoBackModal(true);

  // Make going back impossible
  window.history.pushState({}, '', path);

  return (
    <>
      <ConfirmModal
        show={goBackModal}
        message="Are you sure you want to exit the training session?"
        onClose={onCancel}
        onConfirm={onConfirm}
      />
      <div className={styles.container}>
        <header>
          <Button onClick={goBackHandler} plain>
            {'<'}
          </Button>
          <h1>In Session</h1>
          {isLoading && <LoadingBar />}
          {/* <LoadingBar /> */}
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default FullScreenTemplate;
