import React, { useState, useEffect} from 'react'
import { ButtonGroup, Row, Col } from 'reactstrap'
import NoteBookAddModal from './NoteBookAddModal'
import NoteList from './NoteList'
import NoteListAddModal from './NoteListAddModal'
import notebookService from '../services/notebooks'
import noteService from '../services/notes'
import notelistService from '../services/notelists'

/*
    Todo: 
    Add validation for forms
    Implement switching Notebooks
    Implement adding Notebooks
    Implement deleting Notebooks
*/
const Home = () => {
    const [addListModalShown, setAddListModalShown] = useState(false)
    const [addNoteModalShown, setAddNoteModalShown] = useState(false)
    const [currentListId, setCurrentListId] = useState(0)
    const [currentListsOpen, setCurrentListsOpen] = useState([])
    const [currentNotebookId, setCurrentNotebookId] = useState(0)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    const [editListShown, setEditListShown] = useState([])
    const [editNoteModalShown, setEditNoteModalShown] = useState(false)
    const [listTitle, setListTitle] = useState("")
    const [notebook, setNotebook] = useState([])
    const [notebookList, setNotebookList] = useState([])
    const [noteDescription, setNoteDescription] = useState("")
    const [noteTitle, setNoteTitle] = useState("")
    

    const getNotebook = (notebookId) => {
        notebookService
            .get(notebookId)
            .then(notebook => {
                const size = notebook.noteLists.length
                setNotebook(notebook)
                setCurrentListsOpen(new Array(size).fill(false))
                setEditListShown(new Array(size).fill(false))
            })
    }

    const getNotebooks = () => {
        notebookService
            .getAll()
            .then(notebooks => {
                setNotebookList(notebooks)
                setCurrentNotebookId(notebooks[0].id)
                getNotebook(notebooks[0].id)
            })
    }
    useEffect(getNotebooks, [])


    const handleAddList = (event) => {
        event.preventDefault()
        if(listTitle !== "") {
            console.log(`adding list to notebook id: ${currentNotebookId}`)
            const newList = {
                "title": listTitle
            }
            notelistService
                .add(currentNotebookId, newList)
                .then(() => {
                    getNotebook(currentNotebookId)
                })
        }
        else {
            alert("Title cannot be empty.")
        }
    }

    const handleEditList = (event) => {
        if(event.key === "Enter") {
            if(listTitle !== "") {
                const newList = {
                    "id": currentListId,
                    "title": listTitle
                }
                notelistService
                    .edit(currentListId, newList)
                    .then(() => {
                        getNotebook(currentNotebookId)
                    })
            }
            else {
                alert("Title cannot be empty")
            }            
        }
    }

    const handleDeleteList = (listId) => {
        if(window.confirm("Are you sure you want to delete this list?")) {
            console.log(`Deleting list ${listId}`)
            notelistService
                .remove(listId)
                .then(() => {
                    getNotebook(currentNotebookId)
                })
        }
    }

    const handleOpenList = (listId) => {
        const size = notebook.noteLists.length
        let newListsOpen = new Array(size).fill('').map((listOpen, index) => listOpen = currentListsOpen[index])
        let selectedListIndex = notebook.noteLists.findIndex(list => list.id == listId)

        newListsOpen[selectedListIndex] = !newListsOpen[selectedListIndex]
        setCurrentListsOpen(newListsOpen)
    }

    const handleAddNote = (event) => {
        event.preventDefault()
        if(noteTitle !== "" && noteDescription !== "") {
            const newNote = {
                "noteListId": currentListId,
                "title": noteTitle,
                "description": noteDescription,
                "complete": false
            }
            noteService
                .add(currentListId, newNote)
                .then(() => {
                    getNotebook(currentNotebookId)
                    toggleAddNoteModal()
                })
        } else {
            alert("Description and title cannot be empty.")
        }
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
                getNotebook(currentNotebookId)
                toggleEditNoteModal(newNote, currentListId)
            })
    }

    const handleDeleteNote = (noteId) => {
        if(window.confirm("Are you sure you want to delete this note?")) {
            console.log(`deleting note id: ${noteId}`)
            noteService
                .remove(noteId)
                .then(() => {
                    getNotebook(currentNotebookId)
                })
        }
    }

    const handleChangeNotebook = (event) => {
        // called when switching notebooks - changes currentNotebookId
        const notebookId = event.target.value
        setCurrentNotebookId(notebookId)
        getNotebook(notebookId)
    }

    const handleListTitleChange = (event) => {
        setListTitle(event.target.value)
    }

    const handleNoteTitleChange = (event) => {
        setNoteTitle(event.target.value)
    }

    const handleNoteDescriptionChange = (event) => {
        setNoteDescription(event.target.value)
    }

    const toggleAddListModal = (event) => {
        event.stopPropagation()
        console.log(`Toggling add list for notebook id: ${currentNotebookId}`)
        if(addListModalShown) {
            setListTitle("")
        }

        setAddListModalShown(!addListModalShown)
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

    const toggleAddNoteModal = (listId) => {
        if(addNoteModalShown) {
            setNoteTitle("")
            setNoteDescription("")
        } else {
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

    return (
        <Row>
            <NoteListAddModal 
                stateValues={{
                    "open": addListModalShown,
                    "newTitle": listTitle,
                }} 
                handlers={{
                    "toggle": toggleAddListModal,
                    "newTitleChange": handleListTitleChange,
                    "addList": handleAddList
                }}
            />
            <Col xs="12">
                <Row>
                    <Col xs="3">&nbsp;</Col>
                    <Col xs="6" className="d-flex flex-column align-content-center">
                        <label htmlFor="notebooks">Current Notebook:</label>
                        <select name="notebooks" id="notebooks" onChange={handleChangeNotebook} value={currentNotebookId}>
                            {notebookList.map(notebook => {
                                return <option key={notebook.id} value={notebook.id}>{notebook.title}</option>
                            })}
                        </select>
                    </Col>
                    <Col xs="3">&nbsp;</Col>
                </Row>
                <Row>
                    <Col xs="6" className="d-flex justify-content-start">
                        <ButtonGroup className="float-left">
                            <button id="add-notebook" className="btn btn-secondary">
                                <i className="bi bi-journal-plus"></i>
                            </button>
                            <button id="edit-notebook" className="btn btn-secondary">
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button id="delete-notebook" className="btn btn-secondary">
                                <i className="bi bi-trash"></i>
                            </button>
                        </ButtonGroup>
                    </Col>
                    <Col xs="6">
                        <button id="add-list" className="btn btn-secondary float-right" onClickCapture={toggleAddListModal}>
                            <i className="bi bi-file-earmark-plus"></i>
                        </button>
                    </Col>
                </Row>
                <Row>
                    <Col xs="12" className="d-flex justify-content-start">
                        <ul className="flex-fill">
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
                                                    "open": handleOpenList,
                                                    "toggleAddNote": toggleAddNoteModal,
                                                    "toggleEditNote": toggleEditNoteModal,
                                                    "toggleEditList": toggleEditList,
                                                    "addNote": handleAddNote,
                                                    "editNote": handleEditNote,
                                                    "deleteNote": handleDeleteNote,
                                                    "noteTitleChange": handleNoteTitleChange,
                                                    "noteDescriptionChange": handleNoteDescriptionChange,
                                                    "listTitleChange": handleListTitleChange,
                                                    "editList": handleEditList,
                                                    "deleteList": handleDeleteList
                                                }}
                                            />
                                }) 
                                : "loading notebook..." }
                        </ul>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Home