import React from 'react'
import { ButtonGroup, Form, FormGroup, Input, Label, Modal, ModalHeader, ModalBody } from 'reactstrap'

const NoteBookAddModal = ({ stateValues, handlers }) => {
    return (
        <Modal isOpen={stateValues.open} toggle={handlers.toggle}>
            <ModalHeader>Add a new notebook</ModalHeader>
            <ModalBody>
                <Form onSubmit={handlers.addNotebook}>
                    <FormGroup>
                        <Label for="new-title">Title</Label>
                        <Input name="new-title" value={stateValues.newTitle} onChange={handlers.newTitleChange}></Input>
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

export default NoteBookAddModal