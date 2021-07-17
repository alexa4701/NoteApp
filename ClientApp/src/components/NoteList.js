import React, { useState } from 'react'
import { ButtonGroup, Collapse, ListGroup, ListGroupItem } from 'reactstrap'
import Note from './Note'
import NoteAddModal from './NoteAddModal'


const NoteListTitle = ({ title, stateValues, handlers }) => {
    // if enabled - change title to input & button for editing/submitting
    return (
        <div>
            {(stateValues.editing) 
                ? <input type="text" value={stateValues.newTitle} onChange={handlers.titleChange} onKeyUp={handlers.editList}></input>
                : <h2 className="note-list-title">{title}</h2>
            }
        </div>
    )
}

const NoteList = ({ noteList, stateValues, handlers }) => {
    const size = noteList.notes.length
    const [currentNotesOpen, setCurrentNotesOpen] = useState(new Array(size).fill(false))

    const handleListOpen = (event) => {
        event.stopPropagation()
        handlers.open(noteList.id)
    }

    const handleOpenNote = (noteId) => {
        let newNotesOpen = new Array(size).fill('').map((noteOpen, index) => noteOpen = currentNotesOpen[index])
        let selectedNoteIndex = noteList.notes.findIndex(note => note.id == noteId)
        newNotesOpen[selectedNoteIndex] = !newNotesOpen[selectedNoteIndex]
        setCurrentNotesOpen(newNotesOpen)
    }

    const toggleAddNote = (event) => {
        //event.stopPropagation()
        handlers.toggleAddNote(noteList.id)
    }

    const toggleEditList = (event) => {
        event.stopPropagation()
        handlers.toggleEditList(noteList.id)
    }

    const handleDelete = (event) => {
        event.stopPropagation()
        handlers.deleteList(noteList.id)
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
                    "toggle": toggleAddNote,
                    "addNote": handlers.addNote,
                    "newTitleChange": handlers.noteTitleChange,
                    "newDescriptionChange": handlers.noteDescriptionChange,
                }}
            />
            <ListGroupItem className="note-list-header" onClick={handleListOpen} data-list-id={noteList.id} >
                <NoteListTitle 
                    title={noteList.title}
                    stateValues={{
                        "editing": stateValues.editListOpen,
                        "newTitle": stateValues.newListTitle
                    }}
                    handlers={{
                        "titleChange": handlers.listTitleChange,
                        "editList": handlers.editList
                    }}
                />
                <ButtonGroup className="note-list-btns" data-list-id={noteList.id}>
                    <button id="add-note" className="btn btn-secondary" onClickCapture={toggleAddNote} data-list-id={noteList.id}>
                        <i className="bi bi-file-earmark-plus"></i>
                    </button>
                    <button id="edit-list" className="btn btn-secondary" onClickCapture={toggleEditList} data-list-id={noteList.id}>
                        <i className="bi bi-pencil"></i>
                    </button>
                    <button id="edit-list" className="btn btn-secondary" onClickCapture={handleDelete} data-list-id={noteList.id}>
                        <i className="bi bi-trash"></i>
                    </button>
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
                            "open": handleOpenNote,
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