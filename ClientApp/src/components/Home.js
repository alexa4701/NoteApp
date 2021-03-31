import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import NoteList from './NoteList';
import axios from 'axios';

const Home = () => {
    const [currentNotebookId, setCurrentNotebookId] = useState(0);
    const [notebook, setNotebook] = useState([]);
    const [currentListsOpen, setCurrentListsOpen] = useState([]);
    const [addNoteModalShown, setAddNoteModalShown] = useState(false);
    const [addingToListId, setAddingToListId] = useState(0);
    const [newTitle, setNewTitle] = useState("")
    const [newDescription, setNewDescription] = useState("")

    // HTTP GET all note lists in the current notebook
    useEffect(() => {
        axios
            .get(`http://localhost:3001/noteBooks/${currentNotebookId}`)
            .then(response => {
                const initialNotebook = response.data;
                const initialListsOpen = new Array(initialNotebook.noteLists.length).fill(false);

                setNotebook(initialNotebook);
                setCurrentListsOpen(initialListsOpen);
            });
    }, []);

    const handleListOpen = (event) => {
        if(!event.target.className.includes("btn")) {
            const size = notebook.noteLists.length;
            const listId = event.target.getAttribute("data-list-id");
            let newListsOpen = new Array(size).fill('').map((listOpen, index) => listOpen = currentListsOpen[index]);
    
            newListsOpen[listId] = !newListsOpen[listId]
            setCurrentListsOpen(newListsOpen);
        }
    }

    const toggleAddNoteModal = (event) => {
        if(addNoteModalShown) {
            setNewTitle("");
            setNewDescription("");
            setAddNoteModalShown(!addNoteModalShown);
        } else {
            setAddingToListId(event.target.getAttribute("data-list-id"));
            setAddNoteModalShown(!addNoteModalShown);
        }
    }

    const handleAddNote = (event) => {
        event.preventDefault();
        const newNote = {
            "noteListId": addingToListId,
            "title": newTitle,
            "description": newDescription,
            "complete": false
        }

        axios
            .post(`http://localhost:3001/noteBooks/${currentNotebookId}/${addingToListId}`, newNote)
            .then(response => {
                console.log(response.data);
            })
    }

    const handleNewTitleChange = (event) => {
        console.log(addingToListId);
        console.log(event.target.value);
        setNewTitle(event.target.value);

    }

    const handleNewDescriptionChange = (event) => {
        console.log(addingToListId);
        console.log(event.target.value);
        setNewDescription(event.target.value);
    }

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="10">
                <h2 className="notebook-title">{notebook.title}</h2>
                <ul>
                    {(notebook.noteLists) 
                        ? notebook.noteLists.map(noteList => {
                            return <NoteList 
                                        key ={noteList.id} 
                                        noteList={noteList} 
                                        stateValues={{
                                            "open": currentListsOpen[noteList.id],
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

export default Home;