import React from 'react'
import { Route } from 'react-router'
import Layout from './components/Layout'
import Home from './components/Home'
import Contact from './components/Contact'

const App = () => {
    return (
        <Layout>
            <Route exact path="/" component={Home} />
            <Route path="/contact" component={Contact} />
        </Layout>
    )
}

export default App
