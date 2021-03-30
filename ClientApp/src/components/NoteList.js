import React from 'react';
import { ButtonGroup, Collapse, ListGroup, ListGroupItem } from 'reactstrap';
import Note from './Note';


const NoteList = ({ noteList, stateValues, handlers }) => {

    return (
        <ListGroup key={noteList.id} className="note-list">
            <ListGroupItem className="note-list-header">
                <h2>{noteList.title}</h2>
                <ButtonGroup className="note-list-btns">
                    <button className="btn btn-secondary">add note</button>
                    <button className="btn btn-secondary" onClick={handlers.open}>open</button>
                    <button className="btn btn-secondary">edit</button>
                </ButtonGroup>
            </ListGroupItem>
            <Collapse isOpen={stateValues.open}>
                {noteList.notes.map(note => <Note key ={note.id} note={note}/>)}
            </Collapse>
        </ListGroup>
    )
}

export default NoteList;