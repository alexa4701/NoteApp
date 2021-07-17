import React from 'react'
import { ButtonGroup, Col, Input } from 'reactstrap'

const NoteSummary = ({ note, handlers }) => {
    const handleOpen = (event) => {
        event.stopPropagation()
        handlers.open(note.id)
    }

    return (
        <div className="note-summary" onClickCapture={handleOpen}>
            <Col xs="8">
                <Input type="checkbox"/>
                {note.title} 
            </Col>
            <Col xs="4">
                <ButtonGroup className="note-btns float-right">
                    <button id="edit-note" className="btn btn-secondary" data-note-id={note.id} onClickCapture={handlers.toggleEdit}>
                        <i className="bi bi-pencil" data-note-id={note.id}></i>
                    </button>
                    <button id="delete-note" className="btn btn-secondary" data-note-id={note.id} onClickCapture={handlers.delete}>
                        <i className="bi bi-trash" data-note-id={note.id}></i>
                    </button>
                </ButtonGroup>
            </Col>
        </div>
    )
}

export default NoteSummary