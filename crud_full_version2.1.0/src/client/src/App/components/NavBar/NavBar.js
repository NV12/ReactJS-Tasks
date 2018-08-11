import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route } from 'react-router-dom';
import AllEmployees from '../AllEmployees/AllEmployees';
import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: true,
            navbarItems: []
        }
        this.manageNavLinks = this.manageNavLinks.bind(this);
    }

    componentDidMount() {
        this.manageNavLinks();
    }

    componentDidUpdate() {
        // this.manageNavLinks();
    }

    manageNavLinks() {
        let navLinks;
        const afterLoggedIn = ['Employees', 'Setings'];
        const beforeLoggingIn = ['SignUp', 'Login'];

        if (this.state.loggedIn) {
            navLinks = afterLoggedIn.map((element, index) => {
                return (
                    <Nav key={index}>
                        <LinkContainer to={"/" + element.toLowerCase() } >
                            <NavItem>{element}</NavItem>
                        </LinkContainer>
                    </Nav>
                )
            })
        } else {
            navLinks = beforeLoggingIn.map((element, index) => {
                return (
                    <Nav key={index}>
                        <LinkContainer to={"" + element.toLowerCase} >
                            <NavItem>{element}</NavItem>
                        </LinkContainer>
                    </Nav>
                );
            })
        }
        console.log("NAVITEMS: ", navLinks);
        this.setState({
            navbarItems: navLinks
        });
    }


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
                        {/* {console.log(this.state.navbarItems)} */}
                       {this.state.navbarItems}
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