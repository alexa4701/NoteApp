import React, { useState } from 'react'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

const NavMenu = (props) => {
    const [collapsed, setCollapsed] = useState(true)

    const toggleNavbar = () => {
        return setCollapsed(!collapsed)
    }

    return(
        <Navbar color="dark" dark>
            <NavbarBrand href="/" className="mr-auto">NoteApp</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse isOpen={!collapsed} navbar>
                <Nav navbar>
                    <NavItem>
                        <NavLink href="/">Home</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/contact">Contact</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default NavMenu