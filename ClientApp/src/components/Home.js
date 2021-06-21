import React, { useState, useEffect} from 'react'
import { Row, Col } from 'reactstrap'
import NoteList from './NoteList'
import notebookService from '../services/notebooks'
import noteService from '../services/notes'

/*
    Todo: 
    Add validation for forms
    Add confirmation for deleting
    Implement switching Notebooks
    Implement adding Notebooks, Notelists, notes.
    Implement deleting above items
    Implement editing above items
*/
const Home = () => {
    const [currentNotebookId, setCurrentNotebookId] = useState(2)
    const [notebook, setNotebook] = useState([])
    const [currentListsOpen, setCurrentListsOpen] = useState([])
    const [addNoteModalShown, setAddNoteModalShown] = useState(false)
    const [editNoteModalShown, setEditNoteModalShown] = useState(false)
    const [currentListId, setCurrentListId] = useState(0)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    const [noteTitle, setNoteTitle] = useState("")
    const [noteDescription, setNoteDescription] = useState("")

    const getNoteBook = () => {
        notebookService
            .get(currentNotebookId)
            .then(notebook => {
                setNotebook(notebook)
            })
    }

    useEffect(getNoteBook, [])

    const toggleAddNoteModal = (event) => {
        event.stopPropagation()
        if(addNoteModalShown) {
            setNoteTitle("")
            setNoteDescription("")
        } else {
            setCurrentListId(event.target.getAttribute("data-list-id"))
        }
        setAddNoteModalShown(!addNoteModalShown)
    }

    const toggleEditNoteModal = (note, listId) => {
        if(editNoteModalShown) {
            setNoteTitle("")
            setNoteDescription("")
        } else {
            setNoteTitle(note.title)
            setNoteDescription(note.description)
            setCurrentNoteId(note.id)
            setCurrentListId(listId)
        }
        setEditNoteModalShown(!editNoteModalShown)
    }

    const handleListOpen = (event) => {
        event.stopPropagation()
        const size = notebook.noteLists.length
        const listId = event.target.getAttribute("data-list-id")
        let newListsOpen = new Array(size).fill('').map((listOpen, index) => listOpen = currentListsOpen[index])
        let selectedListIndex = notebook.noteLists.findIndex(list => list.id == listId)

        newListsOpen[selectedListIndex] = !newListsOpen[selectedListIndex]
        setCurrentListsOpen(newListsOpen)
    }

    const handleAddNote = (event) => {
        event.preventDefault()
        const newNote = {
            "noteListId": currentListId,
            "title": noteTitle,
            "description": noteDescription,
            "complete": false
        }
        console.log(newNote)
        noteService
            .add(currentListId, newNote)
            .then(() => {
                getNoteBook()
                toggleAddNoteModal()
            })
    }

    const handleEditNote = (event) => {
        event.preventDefault()
        const newNote = {
            "id": currentNoteId,
            "noteListId": currentListId,
            "title": noteTitle,
            "description": noteDescription,
            "complete": false // change later
        }
        noteService
            .edit(currentNoteId, newNote)
            .then(() => {
                getNoteBook()
                toggleEditNoteModal(newNote, currentListId)
            })
    }

    const handleDeleteNote = (noteId) => {
        console.log(`deleting note id: ${noteId}`)
        noteService
            .remove(noteId)
            .then(() => {
                getNoteBook()
            })
    }

    const handleNoteTitleChange = (event) => {
        setNoteTitle(event.target.value)
    }

    const handleNoteDescriptionChange = (event) => {
        setNoteDescription(event.target.value)
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="10">
                <h2 className="notebook-title">{notebook.title}</h2>
                <ul>
                    {(notebook.noteLists) 
                        ? notebook.noteLists.map(notelist => {
                            return <NoteList 
                                        key ={notelist.id} 
                                        noteList={notelist} 
                                        stateValues={{
                                            "open": currentListsOpen[notebook.noteLists.findIndex(openList => openList.id == notelist.id)],
                                            "currentNoteId": currentNoteId,
                                            "addNoteOpen": addNoteModalShown,
                                            "editNoteOpen": editNoteModalShown,
                                            "newNoteTitle": noteTitle,
                                            "newNoteDescription": noteDescription
                                        }}
                                        handlers={{
                                            "open": handleListOpen,
                                            "toggleAddNote": toggleAddNoteModal,
                                            "toggleEditNote": toggleEditNoteModal,
                                            "addNote": handleAddNote,
                                            "editNote": handleEditNote,
                                            "deleteNote": handleDeleteNote,
                                            "noteTitleChange": handleNoteTitleChange,
                                            "noteDescriptionChange": handleNoteDescriptionChange
                                        }}
                                    />
                        }) 
                        : "loading notebook..." }
                </ul>
            </Col>
            <Col xs="1"></Col>
        </Row>
    )
}

export default Home