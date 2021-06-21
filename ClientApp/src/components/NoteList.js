import React, { useState } from 'react'
import { ButtonGroup, Collapse, ListGroup, ListGroupItem } from 'reactstrap'
import Note from './Note'
import NoteAddModal from './NoteAddModal'


const NoteList = ({ noteList, stateValues, handlers }) => {
    const size = noteList.notes.length
    const [currentNotesOpen, setCurrentNotesOpen] = useState(new Array(size).fill(false))

    const handleNoteOpen = (event) => {
        const noteId = event.target.parentElement.getAttribute("data-note-id")
        let newNotesOpen = new Array(size).fill('').map((noteOpen, index) => noteOpen = currentNotesOpen[index])
        let selectedNoteIndex = noteList.notes.findIndex(note => note.id == noteId)
        newNotesOpen[selectedNoteIndex] = !newNotesOpen[selectedNoteIndex]
        setCurrentNotesOpen(newNotesOpen)
    }

    return (
        <ListGroup className="note-list" data-list-id={noteList.id}>
            <NoteAddModal 
                stateValues={{
                    "open": stateValues.addNoteOpen,
                    "newTitle": stateValues.newNoteTitle,
                    "newDescription": stateValues.newNoteDescription
                }} 
                handlers={{
                    "toggle": handlers.toggleAddNote,
                    "addNote": handlers.addNote,
                    "newTitleChange": handlers.noteTitleChange,
                    "newDescriptionChange": handlers.noteDescriptionChange,
                }}
            />
            <ListGroupItem className="note-list-header" onClick={handlers.open} data-list-id={noteList.id} >
                <h2 className="note-list-title">{noteList.title}</h2>
                <ButtonGroup className="note-list-btns" data-list-id={noteList.id}>
                    <button id="add-note" className="btn btn-secondary" onClickCapture={handlers.toggleAddNote} data-list-id={noteList.id}><i className="bi bi-file-earmark-plus"></i></button>
                    <button id="edit-list" className="btn btn-secondary" data-list-id={noteList.id}><i className="bi bi-pencil"></i></button>
                </ButtonGroup>
            </ListGroupItem>
            <Collapse isOpen={stateValues.open}>
                {noteList.notes.map(note => 
                    <Note 
                        key={note.id} 
                        note={note}
                        stateValues={{
                            "open": currentNotesOpen[noteList.notes.findIndex(n => n.id == note.id)],
                            "editNoteOpen": stateValues.editNoteOpen,
                            "newTitle": stateValues.newNoteTitle,
                            "newDescription": stateValues.newNoteDescription
                        }}
                        handlers={{
                            "open": handleNoteOpen,
                            "toggleEdit": handlers.toggleEditNote,
                            "editNote": handlers.editNote,
                            "deleteNote": handlers.deleteNote,
                            "newTitleChange": handlers.noteTitleChange,
                            "newDescriptionChange": handlers.noteDescriptionChange,
                        }}
                    />
                )}
            </Collapse>
        </ListGroup>
    )
}

export default NoteList