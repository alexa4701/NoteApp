import React from 'react';
import { ButtonGroup, Form, FormGroup, Input, Modal, ModalHeader, ModalBody } from 'reactstrap';

const NoteAddModal = ({ stateValues, handlers }) => {
    return (
        <Modal isOpen={stateValues.open} toggle={handlers.toggle}>
            <ModalHeader>Add a new note</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Input defaultValue="Note Title..."></Input>
                    </FormGroup>
                    <FormGroup>
                        <Input type="textarea" defaultValue="Description of the note..."></Input>
                    </FormGroup>
                    <FormGroup>
                        <ButtonGroup>
                            <button>submit</button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default NoteAddModal;