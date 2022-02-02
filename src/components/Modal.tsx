import { createPortal } from 'react-dom';

const Modal = ({ children }) => {
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
    >
      {children}
    </div>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;
