import React, { useState } from 'react'
import { ListGroupItem } from 'reactstrap'
import NoteCollapse from './NoteCollapse'
import NoteEditModal from './NoteEditModal'
import NoteSummary from './NoteSummary'

const Note = ({ note, stateValues, handlers }) => {
    const [complete, setComplete] = useState(stateValues.complete)

    const toggleEdit = (event) => {
        event.stopPropagation()
        handlers.toggleEdit(note, note.noteListId)
    }

    const handleComplete = (event) => {
        event.stopPropagation()
        setComplete(!stateValues.complete)
        handlers.complete(note.id)
    }

    const handleDelete = (event) => {
        event.stopPropagation()
        handlers.deleteNote(note.id)
    }

    const handleOpen = (event) => {
        event.stopPropagation()
        if(event.target.classList.contains(`note-expand`)) {
            handlers.open(note.id)
        }
    }

    return (
        <ListGroupItem data-list-id={note.noteListId} data-note-id={note.id}>
            <NoteEditModal 
                stateValues={{
                    "open": stateValues.editNoteOpen,
                    "newTitle": stateValues.newTitle,
                    "newDescription": stateValues.newDescription
                }} 
                handlers={{
                    "toggle": handlers.toggleEdit,
                    "editNote": handlers.editNote,
                    "newTitleChange": handlers.newTitleChange,
                    "newDescriptionChange": handlers.newDescriptionChange,
                }}
            />
            <NoteSummary note={note} 
                stateValues={{
                    "complete": complete
                }}
                handlers={{
                    "open": handleOpen,
                    "toggleEdit": toggleEdit,
                    "complete": handleComplete,
                    "delete": handleDelete,
                }} 
            />
            <NoteCollapse note={note} open={stateValues.open} />
        </ListGroupItem>
    )
}

export default Note