import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const NoteAddForm = ({ open, handleOpen }) => {
    return (
        <Modal isOpen={open} toggle={handleOpen}>
            <ModalBody>add note form goes here...</ModalBody>
        </Modal>
    )
}

export default NoteAddForm;