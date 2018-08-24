import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Redirect, withRouter } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

    notify(status, message) {
        console.log("Inside notify");
        console.log("message: ", message);

        switch (status) {
            case 'success':
                toast.success(message, {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            default:
                console.log("Default success");
                break;
        }
    }

    onLogin() {
        console.log("Inside onLogin");
        this.notify("success", "Logged in successfully!");
        // window.alert("Logged in successfully!");
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
                console.log("Logged out!", res);

                // Removing session info stored in localstorage
                localStorage.removeItem('adminEmail');
                localStorage.removeItem('adminPassword');

                // window.alert("Logged out successfully!");
                this.notify("success", "Logged out successfully!");

                this.setState({
                    loginStatus: false
                });
        
                return <Redirect to='/login' />
            })
            .catch((err) => {
                // console.log("Error: ", err);
            })
    }

    manageNavLinks() {
        const navLinksAfterLoggedIn = ['Employees', 'Settings'];
        const navLinksBeforeLoggingIn = ['Login'];

      
        // If logged in then render navLinksAfterLoggedIn
      
        if (localStorage.getItem('adminEmail')) {
            
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
        
        return this.navLinks;
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
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

export default withRouter(NavBar);


// background: white;
// border-radius: 10px;
// padding: 20px 20px;