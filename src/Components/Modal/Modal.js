import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ toClose, src, alt, isShow }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape' && isShow === true) toClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toClose, isShow]);

  const handleCloseByBackdrop = e => {
    if (e.target === e.currentTarget) {
      toClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleCloseByBackdrop}>
      <div className={s.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  toClose: PropTypes.func.isRequired,
  src: PropTypes.string,
  alt: PropTypes.string,
  isShow: PropTypes.bool.isRequired,
};
