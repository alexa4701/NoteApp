import React, { useState } from 'react';
import { ButtonGroup, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import Note from './Note';
import NoteAddModal from './NoteAddModal';


const NoteList = ({ noteList, stateValues, handlers }) => {
    const size = noteList.notes.length;
    const [currentNotesOpen, setCurrentNotesOpen] = useState(new Array(size).fill(false));

    const handleNoteOpen = (event) => {
        const noteId = event.target.parentElement.getAttribute("data-note-id");
        let newNotesOpen = new Array(size).fill('').map((noteOpen, index) => noteOpen = currentNotesOpen[index]);

        newNotesOpen[noteId] = !newNotesOpen[noteId]
        setCurrentNotesOpen(newNotesOpen);
    }

    return (
        <ListGroup key={noteList.id} className="note-list" data-list-id={noteList.id}>
            <NoteAddModal 
                stateValues={{
                    "open": stateValues.addOpen
                }} 
                handlers={{
                    "toggle": handlers.toggleAdd
                }}
            />
            <ListGroupItem className="note-list-header" onClick={handlers.open} data-list-id={noteList.id} >
                <h2>{noteList.title}</h2>
                <ButtonGroup className="note-list-btns" data-list-id={noteList.id}>
                    <button className="btn btn-secondary" onClick={handlers.toggleAdd} data-list-id={noteList.id}>add note</button>
                    <button className="btn btn-secondary" data-list-id={noteList.id}>edit</button>
                </ButtonGroup>
            </ListGroupItem>
            <Collapse isOpen={stateValues.open}>
                {noteList.notes.map(note => 
                    <Note 
                        key={note.id} 
                        note={note}
                        stateValues={{
                            "open": currentNotesOpen[note.id]
                        }}
                        handlers={{
                            "open": handleNoteOpen
                        }}
                    />
                )}
            </Collapse>
        </ListGroup>
    )
}

export default NoteList;