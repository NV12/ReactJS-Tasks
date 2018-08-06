import React, { Component } from 'react';
import { Navbar, Nav} from 'react-bootstrap';
import { Router, Route, Link } from '../../../../node_modules/react-router-dom';
import AllEmployees from '../AllEmployees/AllEmployees';

class NavBar extends Component {

    render() {
        return (
            <Router>
                <div>
                    <Navbar inverse collapseOnSelect>
                        <Navbar.Header>
                            <Navbar.Brand>
                                <a href="#brand">Admin Panel</a>
                            </Navbar.Brand>
                            <Navbar.Toggle />
                        </Navbar.Header>
                        <Navbar.Collapse>
                            <Nav>
                                <Link to="/">New Employee</Link>
                                <Link to="/">Settings</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <Route path="/" exact component= {AllEmployees} />
            </Router>
        );
    }
}

export default NavBar;