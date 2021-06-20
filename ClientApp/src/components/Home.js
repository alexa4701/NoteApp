import React, { useState, useEffect, version } from 'react'
import { Row, Col } from 'reactstrap'
import NoteList from './NoteList'
import notebookService from '../services/notebooks'
import noteService from '../services/notes'

/*
    Todo: 
    Implement changing Notebooks
    Implement adding Notebooks, Notelists, notes.
    Implement deleting above items
    Implement editing above items
*/
const Home = () => {
    const [currentNotebookId, setCurrentNotebookId] = useState(2)
    const [notebook, setNotebook] = useState([])
    const [currentListsOpen, setCurrentListsOpen] = useState([])
    const [addNoteModalShown, setAddNoteModalShown] = useState(false)
    const [currentListId, setCurrentListId] = useState(0)
    const [noteTitle, setNewTitle] = useState("")
    const [noteDescription, setNewDescription] = useState("")

    const getNoteBook = () => {
        notebookService
            .get(currentNotebookId)
            .then(notebook => {
                setNotebook(notebook)
            })
    }

    useEffect(getNoteBook, [])

    const toggleAddNoteModal = (event) => {
        console.log(notebook)
        if(addNoteModalShown) {
            setNewTitle("")
            setNewDescription("")
            setAddNoteModalShown(!addNoteModalShown)
        } else {
            setCurrentListId(event.target.getAttribute("data-list-id"))
            setAddNoteModalShown(!addNoteModalShown)
        }
    }

    const handleListOpen = (event) => {
        if(!event.target.className.includes("btn")) {
            const size = notebook.noteLists.length
            const listId = event.target.getAttribute("data-list-id")
            let newListsOpen = new Array(size).fill('').map((listOpen, index) => listOpen = currentListsOpen[index])
            let selectedListIndex = notebook.noteLists.findIndex(list => list.id == listId)

            newListsOpen[selectedListIndex] = !newListsOpen[selectedListIndex]
            setCurrentListsOpen(newListsOpen)
        }
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

    const handleNoteTitleChange = (event) => {
        setNewTitle(event.target.value)

    }

    const handleNoteDescriptionChange = (event) => {
        setNewDescription(event.target.value)
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
                                            "addOpen": addNoteModalShown,
                                            "newNoteTitle": noteTitle,
                                            "newNoteDescription": noteDescription
                                        }}
                                        handlers={{
                                            "open": handleListOpen,
                                            "toggleAdd": toggleAddNoteModal,
                                            "addNote": handleAddNote,
                                            "newTitleChange": handleNoteTitleChange,
                                            "newDescriptionChange": handleNoteDescriptionChange
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