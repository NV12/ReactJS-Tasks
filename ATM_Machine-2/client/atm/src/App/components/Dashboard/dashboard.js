import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './dashboard.css';
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: ''
        }

        this.handleAmount = this.handleAmount.bind(this);
        // Storing atmID manually
        // this.atmID = "5b7ff09d4c9e137714e25737";
        // this.handleSubmit = this.
    }

    handleAmount(event) {
        console.log("event", event.target.value);

        this.setState({
            amount: event.target.value
        })
    }


    handleSubmit(event) {
        
        
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <h1>Dashboard</h1>
                    </FormGroup>
                    <FormGroup controlId="Enter amount" bsSize="large">
                        <ControlLabel>Enter amount: </ControlLabel>
                        <FormControl autoFocus type="number" value={this.state.amount} onChange={this.handleAmount} required />
                    </FormGroup>

                    {console.log("I am response!")}
                    {/* <h1>dasdas</h1> */}
                    {/* <FormGroup> */}
                    <Button block bsSize="large" type="submit">
                        Enter
                    </Button>
                    {/* </FormGroup> */}
                </form>
            </div>
        )
    }
}

export default withRouter(Dashboard); 