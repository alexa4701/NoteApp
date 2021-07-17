import React from 'react'
import { Row, Col, ButtonGroup, Collapse, ListGroupItem } from 'reactstrap'
import NoteCollapse from './NoteCollapse'
import NoteEditModal from './NoteEditModal'
import NoteSummary from './NoteSummary'

const Note = ({ note, stateValues, handlers }) => {
    const toggleEdit = (event) => {
        event.stopPropagation()
        handlers.toggleEdit(note, note.noteListId)
    }

    const handleDelete = (event) => {
        event.stopPropagation()
        handlers.deleteNote(note.id)
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
                handlers={{
                    "open": handlers.open,
                    "toggleEdit": toggleEdit,
                    "delete": handleDelete,
                }} 
            />
            <NoteCollapse note={note} open={stateValues.open} />
        </ListGroupItem>
    )
}

export default Note