import React from 'react'
import { Row, Col, ButtonGroup, Collapse, ListGroupItem } from 'reactstrap'
import NoteEditModal from './NoteEditModal'

const NoteSummary = ({ note, handlers }) => {
    return (
        <div className="note-summary" onClickCapture={handlers.open}>
            {note.title} 
            <ButtonGroup className="note-btns float-right">
                <button id="edit-note" className="btn btn-secondary" data-note-id={note.id} onClickCapture={handlers.toggleEdit}><i className="bi bi-pencil" data-note-id={note.id}></i></button>
                <button id="delete-note" className="btn btn-secondary" data-note-id={note.id}><i className="bi bi-trash" data-note-id={note.id}></i></button>
            </ButtonGroup>
        </div>
    )
}

const NoteCollapse = ({ note, open }) => {
    return (
        <Collapse isOpen={open}>
            <br />
            <Row>
                <Col xs="12">
                    <div className="note-txt">
                        "{note.description}"
                    </div>
                </Col>
            </Row>
        </Collapse>
    )
}

const Note = ({ note, stateValues, handlers }) => {
    const toggleEdit = (event) => {
        event.stopPropagation()
        handlers.toggleEdit(note, note.noteListId)
    }

    return (
        <ListGroupItem data-list-id={note.noteListId} data-note-id={note.id}>
            <NoteEditModal 
                stateValues={{
                    "open": stateValues.editNoteOpen,
                    "newTitle": stateValues.newTitle,
                    "newDescription": stateValues.newDescription
                }} 
                handlers={{
                    "toggle": handlers.toggleEdit,
                    "editNote": handlers.editNote,
                    "newTitleChange": handlers.newTitleChange,
                    "newDescriptionChange": handlers.newDescriptionChange,
                }}
            />
            <NoteSummary note={note} 
                handlers={{
                    "open": handlers.open,
                    "toggleEdit": toggleEdit
                }} 
            />
            <NoteCollapse note={note} open={stateValues.open} />
        </ListGroupItem>
    )
}

export default Note