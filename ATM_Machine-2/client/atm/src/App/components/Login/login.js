import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import './login.css';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: "",
            pin: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handelUserName = this.handelUserName.bind(this);
        this.handelPIN = this.handelPIN.bind(this);
    }
    componentWillMount() {
        // axios.
    }

    handelUserName(event) {
        console.log("Event", event.target.value);
        this.setState({
            userName: event.target.value
        });
    }

    handelPIN(event) {
        console.log("Event", event.target.value);
        this.setState({
            pin: event.target.value
        });
    }

    handleSubmit(event) {
        console.log("Inside handleSublmit: ");
        event.preventDefault();
        console.log("Event.target", event.target[0].value, event.target[1].value);

        let bodyFormData = {
            userName: this.state.userName,
            pin: this.state.pin
        };

        console.log("Form data: ", bodyFormData);
        
        axios({
            method: 'post',
            url: 'http://localhost:3000/atmUser/login',
            data: bodyFormData
        
        })
            .then((res) => {
                console.log("Yeah!", res);

                // Never save confidential info in localstorage
                // localStorage.setItem('PIN', event.target[1].value);
                localStorage.setItem("PIN", this.state.pin);
                localStorage.setItem("atmID", 12345);

                this.props.history.push({
                    pathname: '/dashboard'
                    // state: { loginStatus: true }
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
                    <FormGroup controlId="userName" bsSize="large">
                        <ControlLabel>userName</ControlLabel>
                        <FormControl autoFocus type="text" value={this.state.userName} required onChange={this.handelUserName}/>
                    </FormGroup>
                    <FormGroup controlId="PIN" bsSize="large">
                        <ControlLabel>PIN</ControlLabel>
                        <FormControl type="password" required value={this.state.pin} onChange={this.handelPIN}/>
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