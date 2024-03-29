import React, { useState, useEffect} from 'react'
import { ButtonGroup, Row, Col } from 'reactstrap'
import NoteBookAddModal from './NoteBookAddModal'
import NoteBookEditModal from './NoteBookEditModal'
import NoteList from './NoteList'
import NoteListAddModal from './NoteListAddModal'
import notebookService from '../services/notebooks'
import noteService from '../services/notes'
import notelistService from '../services/notelists'

/*
    Todo: 
    Add users, logging in/registering with JWT auth
    Improve todo items - formatting, dates (started & due)
*/
const Home = () => {
    const [addListModalShown, setAddListModalShown] = useState(false)
    const [addNotebookModalShown, setAddNotebookModalShown] = useState(false)
    const [addNoteModalShown, setAddNoteModalShown] = useState(false)
    const [currentListId, setCurrentListId] = useState(0)
    const [currentListsOpen, setCurrentListsOpen] = useState([])
    const [currentNotebookId, setCurrentNotebookId] = useState(0)
    const [currentNoteId, setCurrentNoteId] = useState(0)
    const [editListShown, setEditListShown] = useState([])
    const [editNotebookModalShown, setEditNotebookModalShown] = useState(false)
    const [editNoteModalShown, setEditNoteModalShown] = useState(false)
    const [listTitle, setListTitle] = useState("")
    const [notebook, setNotebook] = useState([])
    const [notebookList, setNotebookList] = useState([])
    const [notebookTitle, setNotebookTitle] = useState("")
    const [noteDescription, setNoteDescription] = useState("")
    const [noteTitle, setNoteTitle] = useState("")
    const [notesComplete, setNotesComplete] = useState([])
    
    const getCompletedNotes = (notebook) => {
        let completedNotes = []

        notebook.noteLists.forEach(list => {
            list.notes.forEach(note => (note.complete) ? completedNotes.push(note.id) : false)
        })
        setNotesComplete([...completedNotes])
    }

    const getNotebook = (notebookId) => {
        notebookService
            .get(notebookId)
            .then(notebook => {
                const size = notebook.noteLists.length
                getCompletedNotes(notebook)
                setNotebook(notebook)
                setEditListShown(new Array(size).fill(false))

            })
            .catch(e => alert("Notebook failed to load."))
    }

    const getNotebooks = () => {
        notebookService
            .getAll()
            .then(notebooks => {
                setNotebookList(notebooks)
                setCurrentNotebookId(notebooks[0].id)
                getNotebook(notebooks[0].id)
            })
            .catch(e => alert("Notebook list failed to load."))
    }
    useEffect(getNotebooks, [])

    const handleAddNotebook = (event) => {
        event.preventDefault()
        if(notebookTitle !== "") {
            const newNotebook = {
                "title": notebookTitle
            }
            notebookService
                .add(newNotebook)
                .then(() => {
                    setNotebookTitle("")
                    setAddNotebookModalShown(!addNotebookModalShown)
                    getNotebooks()
                })
                .catch(e => alert("Request failed :("))
        }
        else {
            alert("Notebook title cannot be empty.")
        }
    }

    const handleChangeNotebook = (event) => {
        const notebookId = event.target.value
        setCurrentNotebookId(notebookId)
        getNotebook(notebookId)
    }

    const handleEditNotebook = (event) => {
        event.preventDefault()
        if(notebookTitle !== "") {
            const newNotebook = {
                "id": currentNotebookId,
                "title": notebookTitle
            }
            notebookService
                .edit(currentNotebookId, newNotebook)
                .then(() => {
                    setNotebookTitle("")
                    setEditNotebookModalShown(!editNotebookModalShown)
                    getNotebooks()
                })
                .catch(e => alert("Request failed :("))
        }
        else {
            alert("Notebook title cannot be empty.")
        }
    }

    const handleDeleteNotebook = () => {
        if(window.confirm("Are you sure you want to delete the selected notebook?")) {
            notebookService
                .remove(currentNotebookId)
                .then(() => {
                    getNotebooks()
                })
                .catch(e => alert("Request failed :("))
        }
    }

    const handleAddList = (event) => {
        event.preventDefault()
        if(listTitle !== "") {
            const newList = {
                "title": listTitle
            }
            notelistService
                .add(currentNotebookId, newList)
                .then(() => {
                    getNotebook(currentNotebookId)
                })
                .catch(e => alert("Request failed :("))
        }
        else {
            alert("List title cannot be empty.")
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
                    .catch(e => alert("Request failed :("))
            }
            else {
                alert("Title cannot be empty")
            }            
        }
    }

    const handleDeleteList = (listId) => {
        if(window.confirm("Are you sure you want to delete this list?")) {
            notelistService
                .remove(listId)
                .then(() => {
                    getNotebook(currentNotebookId)
                })
                .catch(e => alert("Request failed :("))
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
                .catch(e => alert("Request failed :("))
        } else {
            alert("Note description and title cannot be empty.")
        }
    }

    const handleEditNote = (event) => {
        event.preventDefault()
        const newNote = {
            "id": currentNoteId,
            "noteListId": currentListId,
            "title": noteTitle,
            "description": noteDescription,
            "complete": false
        }
        noteService
            .edit(currentNoteId, newNote)
            .then(() => {
                getNotebook(currentNotebookId)
                toggleEditNoteModal(newNote, currentListId)
            })
            .catch(e => alert("Request failed :("))
    }

    const handleCompleteNote = (noteId) => {
        let newNotesComplete = [...notesComplete]
        if(!newNotesComplete.includes(noteId)) {
            newNotesComplete.push(noteId)
        }
        else {
            let index = newNotesComplete.indexOf(noteId)
            newNotesComplete.splice(index, 1)
        }
        noteService
            .toggleComplete(noteId)
            .then(() => {
                setNotesComplete(newNotesComplete)
                getNotebook(currentNotebookId)
            })
            .catch(e => alert("Request failed :("))
    }

    const handleDeleteNote = (noteId) => {
        if(window.confirm("Are you sure you want to delete this note?")) {
            noteService
                .remove(noteId)
                .then(() => {
                    getNotebook(currentNotebookId)
                })
                .catch(e => alert("Request failed :("))
        }
    }

    const handleListTitleChange = (event) => {
        setListTitle(event.target.value)
    }

    const handleNotebookTitleChange = (event) => {
        setNotebookTitle(event.target.value)
    }

    const handleNoteTitleChange = (event) => {
        setNoteTitle(event.target.value)
    }

    const handleNoteDescriptionChange = (event) => {
        setNoteDescription(event.target.value)
    }

    const toggleAddNotebookModal = () => {
        if(addNotebookModalShown) {
            setNotebookTitle("")
        }

        setAddNotebookModalShown(!addNotebookModalShown)
    }

    const toggleEditNotebookModal = () => {
        if(editNotebookModalShown) {
            setNotebookTitle("")
        }

        setEditNotebookModalShown(!editNotebookModalShown)
    }

    const toggleAddListModal = (event) => {
        event.stopPropagation()
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
            <NoteBookAddModal 
                stateValues={{
                    "open": addNotebookModalShown,
                    "newTitle": notebookTitle,
                }} 
                handlers={{
                    "toggle": toggleAddNotebookModal,
                    "newTitleChange": handleNotebookTitleChange,
                    "addNotebook": handleAddNotebook
                }}
            />
            <NoteBookEditModal 
                stateValues={{
                    "open": editNotebookModalShown,
                    "newTitle": notebookTitle,
                }} 
                handlers={{
                    "toggle": toggleEditNotebookModal,
                    "newTitleChange": handleNotebookTitleChange,
                    "editNotebook": handleEditNotebook
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
                            <button id="add-notebook" className="btn btn-secondary" onClick={toggleAddNotebookModal}>
                                <i className="bi bi-journal-plus"></i>
                            </button>
                            <button id="edit-notebook" className="btn btn-secondary" onClick={toggleEditNotebookModal}>
                                <i className="bi bi-pencil"></i>
                            </button>
                            <button id="delete-notebook" className="btn btn-secondary" onClick={handleDeleteNotebook}>
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
                                                    "newListTitle": listTitle,
                                                    "notesComplete": notesComplete
                                                }}
                                                handlers={{
                                                    "open": handleOpenList,
                                                    "toggleAddNote": toggleAddNoteModal,
                                                    "toggleEditNote": toggleEditNoteModal,
                                                    "toggleEditList": toggleEditList,
                                                    "addNote": handleAddNote,
                                                    "editNote": handleEditNote,
                                                    "complete": handleCompleteNote,
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