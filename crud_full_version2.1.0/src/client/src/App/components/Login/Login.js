import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentWillMount() {
        // axios.
    }

    handleSubmit(event) {
        console.log("Inside handleSublmit: ");
        event.preventDefault();
        console.log("Event.target", event.target[0].value, event.target[1].value);

        // let bodyFormData = new FormData();
        // bodyFormData.set('email', event.target[0].value);
        // bodyFormData.set('password', event.target[1].value);
        let bodyFormData = {
            adminEmail: event.target[0].value,
            adminPassword: event.target[1].value
        };
        console.log("Form data: ", bodyFormData);
        // axios.defaults.withCredentials = true;
        axios({
            method: 'post',
            // url: 'http://192.168.5.16:3000/admins/login',
            // withCredentials: true,
            url: 'http://localhost:3000/admins/login',
            data: bodyFormData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then((res) => {
                console.log("Yeah!", res);
                // console.log("props: ", this.props.loginStatus);
                // this.props.loginStatus = true;

                /* Check this for more than one login  */
                console.log("Before: localStorage: ", localStorage);
                localStorage.setItem("adminEmail", res.data.adminEmail);
                localStorage.setItem("adminPassword", res.data.adminPassword);
                console.log("After: localStorage: ", localStorage);
                
                this.props.history.push({
                    pathname: '/',
                    state: { loginStatus: true }
                });
            })
            .catch((err) => {
                console.log("no!!");
                console.log("Error: ", err);
            });
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <h1>Login</h1>
                    </FormGroup>
                    <FormGroup controlId="email" bsSize="large">
                        <ControlLabel>Email</ControlLabel>
                        <FormControl autoFocus type="email" required />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl type="password" required />
                    </FormGroup>
                    {/* <FormGroup> */}
                    <Button style={{marginLeft: "0"}}  block bsSize="large" type="submit">
                        Login
                    </Button>
                    {/* </FormGroup> */}
                </form>
            </div>
        );
    }
}

export default withRouter(Login); 