import React, { useState } from 'react';
import { Collapse, ListGroupItem } from 'reactstrap';

const NoteCollapse = ({ note, expanded }) => {
    return (
        <Collapse isOpen={expanded}>
            <ul>
                <li>Title: "{note.title}"</li>
                <li>Description: "{note.description}"</li>
            </ul>
        </Collapse>
    )
}

const NoteSummary = ({ note, handleExpand }) => {
    return (
        <div className="note-summary">
            {note.title} 
            <div className="note-btns">
                <button onClick={handleExpand}>expand</button>
                <button>edit</button>
                <button>delete</button>
            </div>
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