import React from 'react';
import { ButtonGroup, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap';

const NoteAddModal = ({ stateValues, handlers }) => {
    return (
        <Modal isOpen={stateValues.open} toggle={handlers.toggle}>
            <ModalHeader>Add a new note</ModalHeader>
            <ModalBody>
                <Form onSubmit={handlers.addNote}>
                    <FormGroup>
                        <Label for="new-title">New Note Title</Label>
                        <Input name="new-title" value={stateValues.newTitle} onChange={handlers.newTitleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="new-description">New Note Description</Label>
                        <Input name="new-description" value={stateValues.newDescription} onChange={handlers.newDescriptionChange} type="textarea"></Input>
                    </FormGroup>
                    <FormGroup>
                        <ButtonGroup>
                            <button type="submit">submit</button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default NoteAddModal;