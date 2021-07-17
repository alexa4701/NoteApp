import React from 'react'
import { ButtonGroup, Col, Input } from 'reactstrap'

const NoteSummary = ({ note, stateValues, handlers }) => {

    return (
        <div className="note-summary note-expand" onClickCapture={handlers.open}>
            <Col xs="1">
                <Input type="checkbox" checked={stateValues.complete} onChange={handlers.complete}/>
            </Col>
            <Col xs="8">
                {(stateValues.complete) 
                    ? <div className="note-complete note-expand">{note.title}</div> 
                    : <div className="note-expand">{note.title}</div> }

            </Col>
            <Col xs="3">
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