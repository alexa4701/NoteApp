import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap'
import NoteList from './NoteList';
import axios from 'axios';

const Home = () => {
    const [notebookShown, setNotebookShown] = useState(0);
    const [notebook, setNotebook] = useState([]);

    // HTTP GET all note lists in the current notebook
    useEffect(() => {
        axios
            .get(`http://localhost:3001/noteBooks/${notebookShown}`)
            .then(response => {
                const initialNotebook = response.data;
                setNotebook(initialNotebook);
            });
    }, []);

    return (
        <Row>
            <Col xs="1"></Col>
            <Col xs="10">
                <h2 className="notebook-title">{notebook.title}</h2>
                <ul>
                    {(notebook.noteLists) 
                        ? notebook.noteLists.map(noteList => <NoteList key ={noteList.id} noteList={noteList}/>) 
                        : "loading notebook..." }
                </ul>
            </Col>
            <Col xs="1"></Col>
        </Row>
    )
}

export default Home;