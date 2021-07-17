import React from 'react'
import { ButtonGroup } from 'reactstrap'

const NoteSummary = ({ note, handlers }) => {
    return (
        <div className="note-summary" onClickCapture={handlers.open}>
            {note.title} 
            <ButtonGroup className="note-btns float-right">
                <button id="edit-note" className="btn btn-secondary" data-note-id={note.id} onClickCapture={handlers.toggleEdit}>
                    <i className="bi bi-pencil" data-note-id={note.id}></i>
                </button>
                <button id="delete-note" className="btn btn-secondary" data-note-id={note.id} onClickCapture={handlers.delete}>
                    <i className="bi bi-trash" data-note-id={note.id}></i>
                </button>
            </ButtonGroup>
        </div>
    )
}

export default NoteSummary