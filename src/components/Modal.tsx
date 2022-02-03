import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';

const Modal = ({ children }) => {
  const history = useHistory();

  const closeModal = (e) => {
    e.stopPropagation();
    history.goBack();
  };
  return createPortal(
    <div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#FFF',
        fontSize: '40px',
        display: 'grid',
        placeContent: 'center',
      }}
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
