import React, { useState } from 'react';
import { ButtonGroup, Collapse, ListGroupItem } from 'reactstrap';

const NoteSummary = ({ note, handleOpen }) => {
    return (
        <div className="note-summary">
            {note.title} 
            <button className="btn btn-secondary" onClick={handleOpen}>open</button>
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

const Note = ({ note }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
    }

    return (
        <ListGroupItem key={note.id}>
            <NoteSummary note={note} handleOpen={handleOpen} />
            <NoteCollapse note={note} open={open} />
        </ListGroupItem>
    )
}

export default Note;