import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import AllEmployees from '../AllEmployees/AllEmployees';
import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';

class NavBar extends Component {

    render() {
        return (
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
                            <LinkContainer to="/employees" >
                                <NavItem>Employee</NavItem>
                            </LinkContainer>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Route exact path="/employees" component={AllEmployees} />
                <Route exact path="/employees/new" component={EmployeeOpr} />
                <Route exact path="/employees/edit/:empID" component={EmployeeOpr} />
            </div>
        );
    }
}

export default NavBar;