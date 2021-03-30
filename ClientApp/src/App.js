import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Contact from './components/Contact';
import NoteAddForm from './components/NoteAddForm';

const App = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
        </Layout>
    )
}

export default App;
