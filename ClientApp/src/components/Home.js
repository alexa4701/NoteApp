import React, { useState, useEffect, version } from 'react'
import { Row, Col } from 'reactstrap'
import NoteList from './NoteList'
import notebookService from '../services/notebooks'
import axios from 'axios'

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
    const [addingToListId, setAddingToListId] = useState(0)
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")

    useEffect(() => {
        notebookService
            .get(currentNotebookId)
            .then(notebook => {
                setNotebook(notebook)
            })
        }, [])

    const handleListOpen = (event) => {
        if(!event.target.className.includes("btn")) {
            const size = notebook.noteLists.length
            const listId = event.target.getAttribute("data-list-id")
            let newListsOpen = new Array(size).fill('').map((listOpen, index) => listOpen = currentListsOpen[index])
            let selectedListIndex = notebook.noteLists.findIndex(nl => nl.id == listId)

            newListsOpen[selectedListIndex] = !newListsOpen[selectedListIndex]
            setCurrentListsOpen(newListsOpen)
        }
    }

    const toggleAddNoteModal = (event) => {
        if(addNoteModalShown) {
            setNewTitle("")
            setNewDescription("")
            setAddNoteModalShown(!addNoteModalShown)
        } else {
            setAddingToListId(event.target.getAttribute("data-list-id"))
            setAddNoteModalShown(!addNoteModalShown)
        }
    }

    const handleAddNote = (event) => {
        event.preventDefault()
        const newNote = {
            "noteListId": addingToListId,
            "title": newTitle,
            "description": newDescription,
            "complete": false
        }
        // replace with service
        axios
            .post(`http://localhost:3001/noteBooks/${currentNotebookId}/${addingToListId}`, newNote)
            .then(response => {
                console.log(response.data)
            })
    }

    const handleNewTitleChange = (event) => {
        console.log(addingToListId)
        console.log(event.target.value)
        setNewTitle(event.target.value)

    }

    const handleNewDescriptionChange = (event) => {
        console.log(addingToListId)
        console.log(event.target.value)
        setNewDescription(event.target.value)
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="10">
                <h2 className="notebook-title">{notebook.title}</h2>
                <ul>
                    {(notebook.noteLists) 
                        ? notebook.noteLists.map(nl => {
                            return <NoteList 
                                        key ={nl.id} 
                                        noteList={nl} 
                                        stateValues={{
                                            "open": currentListsOpen[notebook.noteLists.findIndex(openNl => openNl.id == nl.id)],
                                            "addOpen": addNoteModalShown,
                                            "newNoteTitle": newTitle,
                                            "newNoteDescription": newDescription
                                        }}
                                        handlers={{
                                            "open": handleListOpen,
                                            "toggleAdd": toggleAddNoteModal,
                                            "addNote": handleAddNote,
                                            "newTitleChange": handleNewTitleChange,
                                            "newDescriptionChange": handleNewDescriptionChange
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