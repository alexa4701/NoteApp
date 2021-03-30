import React, { useState } from 'react';
import { ButtonGroup, Collapse, ListGroupItem } from 'reactstrap';

const NoteCollapse = ({ note, expanded }) => {
    return (
        <Collapse isOpen={expanded}>
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

const NoteSummary = ({ note, handleExpand }) => {
    return (
        <div className="note-summary">
            {note.title} 
            <button className="btn btn-secondary" onClick={handleExpand}>expand</button>
        </div>
    )
}

const Note = ({ note }) => {
    const [expanded, setExpanded] = useState(false);

    const handleExpand = () => {
        setExpanded(!expanded);
    }

    return (
        <ListGroupItem key={note.id}>
            <NoteSummary note={note} handleExpand={handleExpand} />
            <NoteCollapse note={note} expanded={expanded} />
        </ListGroupItem>
    )
}

export default Note;