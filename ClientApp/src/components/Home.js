import React, { useState, useEffect} from 'react'
import { Row, Col } from 'reactstrap'
import NoteList from './NoteList'
import notebookService from '../services/notebooks'
import noteService from '../services/notes'
import notelistService from '../services/notelists'

/*
    Todo: 
    Add validation for forms
    Add confirmation for deleting
    Implement switching Notebooks
    Implement adding Notebooks, Notelists.
    Implement deleting Notebooks, Notelists
*/
const Home = () => {
    const [currentNotebookId, setCurrentNotebookId] = useState(2)
    const [notebook, setNotebook] = useState([])
    const [currentListsOpen, setCurrentListsOpen] = useState([])
    const [addNoteModalShown, setAddNoteModalShown] = useState(false)
    const [editNoteModalShown, setEditNoteModalShown] = useState(false)
    const [editListShown, setEditListShown] = useState([])
    const [currentListId, setCurrentListId] = useState(0)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    const [noteTitle, setNoteTitle] = useState("")
    const [noteDescription, setNoteDescription] = useState("")
    const [listTitle, setListTitle] = useState("")

    const getNoteBook = () => {
        notebookService
            .get(currentNotebookId)
            .then(notebook => {
                const size = notebook.noteLists.length
                setNotebook(notebook)
                setCurrentListsOpen(new Array(size).fill(false))
                setEditListShown(new Array(size).fill(false))
            })
    }

    useEffect(getNoteBook, [])

    const toggleAddNoteModal = (listId) => {
        if(addNoteModalShown) {
            setNoteTitle("")
            setNoteDescription("")
        } else {
            console.log(listId)
            setCurrentListId(listId)
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

    const toggleEditList = (listId) => {
        const size = notebook.noteLists.length
        let newEditListShown = new Array(size).fill('').map((listOpen, index) => listOpen = editListShown[index])
        let selectedListIndex = notebook.noteLists.findIndex(list => list.id == listId)
        let selectedTitle = notebook.noteLists[selectedListIndex].title

        if(!editListShown[selectedListIndex]) {
            setCurrentListId(listId)
            setListTitle(selectedTitle)
        }
        else {
            setListTitle("")
        }
        newEditListShown[selectedListIndex] = !newEditListShown[selectedListIndex]
        setEditListShown(newEditListShown)
    }

    const handleListOpen = (listId) => {
        const size = notebook.noteLists.length
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

    const handleEditList = (event) => {
        if(event.key === "Enter") {
            console.log("enter pressed")
            if(listTitle !== "") {
                console.log("title is not empty")
                const newList = {
                    "id": currentListId,
                    "title": listTitle
                }
                notelistService
                    .edit(currentListId, newList)
                    .then(() => {
                        getNoteBook()
                    })
            }
            else {
                alert("Title cannot be empty")
            }            
        }
    }

    const handleNoteTitleChange = (event) => {
        setNoteTitle(event.target.value)
    }

    const handleNoteDescriptionChange = (event) => {
        setNoteDescription(event.target.value)
    }

    const handleListTitleChange = (event) => {
        setListTitle(event.target.value)
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
                                            "editListOpen": editListShown[notebook.noteLists.findIndex(openList => openList.id == notelist.id)],
                                            "newNoteTitle": noteTitle,
                                            "newNoteDescription": noteDescription,
                                            "newListTitle": listTitle
                                        }}
                                        handlers={{
                                            "open": handleListOpen,
                                            "toggleAddNote": toggleAddNoteModal,
                                            "toggleEditNote": toggleEditNoteModal,
                                            "toggleEditList": toggleEditList,
                                            "addNote": handleAddNote,
                                            "editNote": handleEditNote,
                                            "deleteNote": handleDeleteNote,
                                            "noteTitleChange": handleNoteTitleChange,
                                            "noteDescriptionChange": handleNoteDescriptionChange,
                                            "listTitleChange": handleListTitleChange,
                                            "editList": handleEditList
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