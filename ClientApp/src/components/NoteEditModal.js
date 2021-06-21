import React from 'react'
import { ButtonGroup, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'

const NoteEditModal = ({ stateValues, handlers }) => {
    return (
        <Modal isOpen={stateValues.open} toggle={handlers.toggle}>
            <ModalHeader>Edit note</ModalHeader>
            <ModalBody>
                <Form onSubmit={handlers.editNote}>
                    <FormGroup>
                        <Label for="new-title">Title</Label>
                        <Input name="new-title" value={stateValues.newTitle} onChange={handlers.newTitleChange}></Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="new-description">Description</Label>
                        <Input name="new-description" value={stateValues.newDescription} onChange={handlers.newDescriptionChange} type="textarea"></Input>
                    </FormGroup>
                    <FormGroup>
                        <ButtonGroup>
                            <button type="submit">Submit</button>
                        </ButtonGroup>
                    </FormGroup>
                </Form>
            </ModalBody>
        </Modal>
    )
}

export default NoteEditModal