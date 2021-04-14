import React from 'react'
import { ButtonGroup, Collapse, ListGroupItem } from 'reactstrap'

const NoteSummary = ({ note, handleOpen }) => {
    return (
        <div className="note-summary" onClick={handleOpen}>
            {note.title} 
        </div>
    )
}

const NoteCollapse = ({ note, open }) => {
    return (
        <Collapse isOpen={open}>
            <ul>
                <li>Title: "{note.title}"</li>
                <li>Description: "{note.description}"</li>
                <br/>
                <ButtonGroup className="note-btns">
                    <button className="btn btn-secondary">edit</button>
                    <button className="btn btn-danger">delete</button>
                </ButtonGroup>
            </ul>
        </Collapse>
    )
}

const Note = ({ note, stateValues, handlers }) => {
    return (
        <ListGroupItem data-list-id={note.noteListId} data-note-id={note.id}>
            <NoteSummary note={note} handleOpen={handlers.open} />
            <NoteCollapse note={note} open={stateValues.open} />
        </ListGroupItem>
    )
}

export default Note