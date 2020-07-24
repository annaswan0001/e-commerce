import React, { useState } from 'react';
import './Modal.scss';

const Modal = ({ hideModal, toggleModal, children }) => {
  if (hideModal) return null;

  return (
    <>
      <div className="modalOverlay" onClick={() => toggleModal()} />
      <div className="modalCustom">
        {children}
      </div>
    </>
  );
}

export default Modal;