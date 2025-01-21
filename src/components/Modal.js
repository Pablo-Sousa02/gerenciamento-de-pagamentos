// src/components/Modal.js
import React from 'react';
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, person }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <button className="close-button" onClick={onClose}>×</button>
                <h2>{person.name}</h2>
                <p><strong>Email:</strong> {person.email}</p>
                <p><strong>Endereço:</strong> {person.address}</p>
                <p><strong>Número da Casa:</strong> {person.houseNumber}</p>
                <p><strong>Pago:</strong> {person.paid ? 'Sim' : 'Não'}</p>
            </div>
        </div>
    );
};

export default Modal;
