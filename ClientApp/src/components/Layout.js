import React from 'react';
import NavMenu from './NavMenu';
import { Container } from 'reactstrap';


const Layout = (props) => {
    return (
        <>
        <NavMenu />
        <Container className="app">
            {props.children}
        </Container>
        </>
    )
}

export default Layout;