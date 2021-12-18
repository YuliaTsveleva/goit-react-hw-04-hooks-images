import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape' && this.props.isShow === true) {
      this.props.toClose();
    }
  };

  handleCloseByBackdrop = e => {
    if (e.target === e.currentTarget) {
      this.props.toClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div
        className={s.Overlay}
        onClick={this.handleCloseByBackdrop}
        onKeyDown={this.handleKeyDown}
      >
        <div className={s.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;
