import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect, withRouter } from 'react-router-dom';
// import AllEmployees from '../AllEmployees/AllEmployees';
// import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';
// import Login from '../Login/Login';
import './NavBar.css';
import axios from 'axios';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // For showing the navbar links when user is logged in
            loginStatus: false
            // navbarItems: null
        }
        this.manageNavLinks = this.manageNavLinks.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.navLinks = [];
    }

    componentDidMount() {
        // console.log("Inside componentDidMount");
        // this.manageNavLinks();
    }

    componentWillReceiveProps() {
        // console.log("Inside componentWillReceiveProps");
        // console.log("this: ", this);
        if (this.props.history.location.state) {
            if (this.props.history.location.state.loginStatus) {
                this.onLogin();
            }
        }
    }

    componentDidUpdate() {
        // this.manageNavLinks();
    }

    onLogin() {
        // console.log("Inside onLogin");
        window.alert("Logged in successfully!");
        this.setState({
            loginStatus: true
        });
        // this.manageNavLinks();
    }

    onLogout() {
        // console.log("Inside onLogout");

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Session-Name': localStorage.getItem('adminEmail'),
                'Session-Password': localStorage.getItem('adminPassword')
            }
        }
        // console.log("config: ", config);
        axios.get('http://localhost:3000/admins/logout', config)
            .then((res) => {
                // console.log("Logged out!", res);

                // Removing session info stored in localstorage
                localStorage.removeItem('adminEmail');
                localStorage.removeItem('adminPassword');

                window.alert("Logged out successfully!");

                this.setState({
                    loginStatus: false
                });
                // this.manageNavLinks();
                return <Redirect to='/login' />
            })
            .catch((err) => {
                // console.log("Error: ", err);
            })
    }

    manageNavLinks() {
        // console.log("Inside manageNavLinks");
        // console.log("this.state.loginStatus", this.state.loginStatus);
        // let navLinks;
        const navLinksAfterLoggedIn = ['Employees', 'Settings'];
        const navLinksBeforeLoggingIn = ['Login'];

        // console.log("localStorage: ", localStorage);
        // console.log("localStorage.getItem('adminEmail')", localStorage.getItem('adminEmail'));
        // console.log("localStorage.getItem('adminEmail')==null", localStorage.getItem('adminEmail') !== null);

        // If logged in then render navLinksAfterLoggedIn
        // if (this.state.loginStatus) {
        if (localStorage.getItem('adminEmail')) {
            // console.log("Logged in links");
            this.navLinks = navLinksAfterLoggedIn.map((element, index) => {
                return (
                    // Key is required to add when using array to propogate elements 
                    <Nav key={index}>
                        <LinkContainer to={"/" + element.toLowerCase()} >
                            <NavItem>{element}</NavItem>
                        </LinkContainer>
                    </Nav>
                )
            })
            this.navLinks.push((
                <Nav key="2" pullRight>
                    <LinkContainer to="/login">
                        <NavItem onClick={this.onLogout}>Logout</NavItem>
                    </LinkContainer>
                </Nav>
            ));
        } else {
            // console.log("Logged out in links");
            this.navLinks = navLinksBeforeLoggingIn.map((element, index) => {
                return (
                    <Nav key={index} pullRight>
                        <LinkContainer to={"/" + element.toLowerCase()} >
                            <NavItem>{element}</NavItem>
                        </LinkContainer>
                    </Nav>
                );
            })
        }
        // console.log("NAVITEMS: ", this.navLinks);

        return this.navLinks;
        // this.setState({
        //     navbarItems: this.navLinks
        // });
    }


    render() {
        return (
            <div>
                <Navbar inverse collapseOnSelect>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <LinkContainer to="/" >
                                <a href="/">Admin Panel</a>
                            </LinkContainer>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        {this.manageNavLinks()}
                        {/* {this.state.navbarItems} */}
                    </Navbar.Collapse>
                </Navbar>
                {
                    // Showing welcome message on after login
                    // (window.location.href === "http://localhost:3001/" ) ? <h1>Welcome to Admin Portal!</h1> : null
                }

            </div>
        );
    }
}

export default withRouter(NavBar);


// background: white;
// border-radius: 10px;
// padding: 20px 20px;