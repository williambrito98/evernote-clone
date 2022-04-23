import React, { useState } from "react";
import { Button, Column, Container, Dropdown, Navbar } from 'rbx'
import logoImage from '../../assets/images/logo.png'
import logoImageWhite from '../../assets/images/logo-white.png'
import '../../styles/header.scss'
import { Link, Navigate } from "react-router-dom";
import UserService from "../../services/users";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

function Header(props) {

    const [openMenu, setOpenMenu] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);


    const logOut = () => {
        UserService.logout()
        setRedirectToHome(true)
    }


    if (redirectToHome) {
        return <Navigate to="/" replace />
    }


    if (UserService.isLoged()) {
        return (
            <Navbar color="custom-purple" className="navbar-logged">
                <Navbar.Brand>
                    <Column.Group>
                        <Column size="11" offset="1">
                            <Link to="/notes">
                                <img src={logoImageWhite} alt="" />
                            </Link>
                        </Column>
                    </Column.Group>
                    <Navbar.Burger
                        className="navbar-burger burger"
                        aria-label="menu"
                        aria-expanded="false"
                        data-target="navbar-menu">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </Navbar.Burger>
                </Navbar.Brand>

                <Navbar.Menu>
                    <Navbar.Segment as="div" className="navbar-item navbar-start" align="start">
                        <Navbar.Item as="div">
                            <Button
                                className="open-button"
                                color="white"
                                outlined
                                onClick={() => props.setIsOpen(true)}>
                                <FontAwesomeIcon icon={faList} />
                            </Button>
                        </Navbar.Item>
                    </Navbar.Segment>
                    <Navbar.Segment as="div" className="navbar-item navbar-end" align="start">
                        <Navbar.Item as="div">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <Button className="button" color="white" outlined>
                                        <span>Leonardo ▼</span>
                                    </Button>
                                </Dropdown.Trigger>
                                <Dropdown.Menu>
                                    <Dropdown.Content>
                                        <Dropdown.Item as="div">
                                            <Link to="/users/edit">User Edit</Link>
                                        </Dropdown.Item>
                                        <Dropdown.Divider />
                                        <Dropdown.Item as="div">
                                            <a href="#" onClick={e => logOut()}>LogOut</a>
                                        </Dropdown.Item>
                                    </Dropdown.Content>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Navbar.Item>
                    </Navbar.Segment>
                </Navbar.Menu>
            </Navbar>
        )

    }

    return (
        <Navbar active={openMenu}
            onClick={() => setOpenMenu(!openMenu)}>
            <Container>
                <Link to="/">
                    <Navbar.Brand>
                        <img src={logoImage} alt="" />
                        <Navbar.Burger
                            className="navbar-burger burger"
                            aria-label="menu"
                            aria-expanded="false"
                            data-target="navbar-menu">
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                        </Navbar.Burger>
                    </Navbar.Brand>
                </Link>

                <Navbar.Menu id="navbar-menu">
                    <Navbar.Segment as="div" className="navbar-item navbar-end" align="right">
                        <Column.Group>
                            <Column>
                                <Link to="/register" className="button is-white has-text-custom-purple">Register</Link>
                            </Column>
                            <Column>
                                <Link to="/login" className="button is-outlined is-custom-purple">Login</Link>
                            </Column>
                        </Column.Group>
                    </Navbar.Segment>
                </Navbar.Menu>
            </Container>
        </Navbar>
    )
}

export default Header