import React from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import Note from './Note';


const NoteList = ({ noteList }) => {
    return (
        <ListGroup key={noteList.id} className="note-list">
            <ListGroupItem><h2>{noteList.title}</h2></ListGroupItem>
            {noteList.notes.map(note => <Note key ={note.id} note={note}/>)}
        </ListGroup>
    )
}

export default NoteList;