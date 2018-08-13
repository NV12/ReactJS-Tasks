import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Route, Redirect, withRouter } from 'react-router-dom';
import AllEmployees from '../AllEmployees/AllEmployees';
import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';
import Login from '../Login/Login';
import './NavBar.css';
import axios from 'axios';

class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // For showing the navbar links when user is logged in
            loginStatus: false
        }
        this.manageNavLinks = this.manageNavLinks.bind(this);
        this.onLogin = this.onLogin.bind(this);
        this.onLogout = this.onLogout.bind(this);
        this.navLinks = [];
    }

    componentWillMount() {
        console.log("Inside componentWillMount");
        this.manageNavLinks();
    }
    componentDidMount() {
        console.log("Inside componentDidMount");

    }

    componentWillReceiveProps() {
        console.log("Inside componentWillReceiveProps");
        if (this.props.history.location.state) {
            if (this.props.history.location.state.loginStatus) {
                this.onLogin();
            }
        }
    }

    componentDidUpdate() {
        console.log("Inside componentDidUpdate");
        // Don't try below, otherwise it will create an infinite loop for updating render
        // We can solve it by performing deep comparison in shouldComponentUpdate but
        // Rather than working on such problems. avoid it by passing method which directly returns
        // The navLinks
        
        // this.manageNavLinks();
    }

    onLogin() {
        console.log("Inside onLogin");
        window.alert("Logged in successfully!");
        this.setState({
            loginStatus: true
        });
        // this.manageNavLinks();
    }

    onLogout() {
        console.log("Inside onLogout");

        axios.get('http://192.168.4.91:3000/admins/logout')
            .then((res) => {
                console.log("Logged out!", res);
                window.alert("Logged out successfully!");

                this.setState({
                    loginStatus: false
                });

                return <Redirect to='/login' />
            })
            .catch((err) => {
                console.log("Error: ", err);
            })
    }

    manageNavLinks() {
        console.log("Inside manageNavLinks");
        // let navLinks;
        const navLinksAfterLoggedIn = ['Employees', 'Setings'];
        const navLinksBeforeLoggingIn = ['SignUp', 'Login'];

        // If logged in then render navLinksAfterLoggedIn
        if (this.state.loginStatus) {
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
        console.log("NAVITEMS: ", this.navLinks);

        return this.navLinks;
        // this.setState({
        //     navbarItems: navLinks
        // });
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
                        {this.manageNavLinks()}
                    </Navbar.Collapse>
                </Navbar>
                {
                    // Showing welcome message on after login
                    (window.location.href === "http://localhost:3001/" && this.state.loginStatus) ? <h1>Welcome to Admin Portal!</h1> : null
                }
                {
                    // (this.state.loginStatus) ? this.manageNavLinks(): null
                }
                {/* {this.props.location.state.loginStatus ? "YES": "NO"} */}
                <Route exact path='/employees' component={AllEmployees} />
                <Route exact path='/employees/new' component={EmployeeOpr} />
                <Route exact path='/employees/edit/:empID' component={EmployeeOpr} />
                <Route exact path='/login' render={() => (
                    <Login loginMethod={this.onLogin} />
                )} />
            </div>
        );
    }
}

export default withRouter(NavBar);


// background: white;
// border-radius: 10px;
// padding: 20px 20px;