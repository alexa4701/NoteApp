import React from 'react';
import { ButtonGroup, ListGroup, ListGroupItem } from 'reactstrap';
import Note from './Note';


const NoteList = ({ noteList }) => {
    return (
        <ListGroup key={noteList.id} className="note-list">
            <ListGroupItem className="note-list-header">
                <h2>{noteList.title}</h2>
                <ButtonGroup className="note-list-btns">
                    <button className="btn btn-secondary">add note</button>
                    <button className="btn btn-secondary">edit</button>
                </ButtonGroup>
            </ListGroupItem>
            {noteList.notes.map(note => <Note key ={note.id} note={note}/>)}
        </ListGroup>
    )
}

export default NoteList;