import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './dashboard.css';
class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: ''
        }

        this.handleAmount = this.handleAmount.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        // this.updateATM = this.updateATM.
    }

    handleAmount(event) {
        console.log("event", event.target.value);

        this.setState({
            amount: event.target.value
        })
    }


    handleSubmit(event) {
        console.log("Inside handleSubmit");
        event.preventDefault();

        let transactionData = {
            atmID: localStorage.getItem('atmID'),
            withdrawAmount: this.state.amount
        };

        console.log("localStorage.getItem('balance')", Number.parseInt(localStorage.getItem('balance'), 10))

        if (this.state.amount > Number.parseInt(localStorage.getItem('balance'), 10)) {
            console.log("Inside balance condition");
            window.alert("You don't have enough balance in your account!");
            // localStorage.removeItem("userID");
            // localStorage.removeItem("atmID");
            // localStorage.removeItem("balance");

            // this.props.history.push({
            //     pathname: '/login'
            // });
            this.logout();
            return;
        }
        axios({
            method: 'post',
            url: 'http://localhost:3000/atm/withDraw',
            data: transactionData

        })
            .then((res) => {
                console.log("Yeah!", res);

                if (res.data.error) {
                    window.alert(res.data.error);

                    localStorage.removeItem("userID");
                    localStorage.removeItem("atmID");
                    localStorage.removeItem("balance");

                    this.props.history.push({
                        pathname: '/login'
                    });
                }

                else {
                    window.alert("2000 notes: " + res.data.notesToRender.twoThousand + "\n500 notes: " + res.data.notesToRender.fiveHundred + "\n100 notes: " + res.data.notesToRender.hundred);
                    let choice = window.prompt("Do you want to show your remaining balance? y or n");

                    if (choice === 'y') window.alert((Number.parseInt(localStorage.getItem('balance'), 10) - this.state.amount));

                    this.updateATM(res.data.atm, res.data.notesToRender);
                }
            })
            .catch((err) => {
                console.log("no!!");
                console.log("Error: ", err);
            });
    }

    updateATM(oldDataAtm, withdrawedNotes) {
        console.log("Inside updateATM");
        console.log("oldDataAtm", oldDataAtm);
        console.log("withdrawedNotes", withdrawedNotes);

        let atmData = {
            // atmID: localStorage.getItem('atmID'),
            oldDataAtm: oldDataAtm,
            withdrawedAmount: this.state.amount,
            withdrawedNotes: withdrawedNotes
        }
        axios({
            method: 'put',
            url: 'http://localhost:3000/atm/update',
            data: atmData
            // headers: axiosHeaders
        })
            .then((res) => {
                console.log("Updating atm: ", res);
                this.updateUser();
            })
            .catch((err) => {
                console.log("err", err);
            });
    }

    updateUser() {
        console.log("Inside updateUser");

        let userData = {
            userID: localStorage.getItem('userID'),
            withdrawedAmount: this.state.amount,
            balance: localStorage.getItem('balance')
        }
        console.log("userData", userData);

        axios({
            method: 'put',
            url: 'http://localhost:3000/atmUser/withdraw',
            data: userData
        })
            .then((res) => {
                console.log("Updating User: ", res);
                // localStorage.removeItem("userID");
                // localStorage.removeItem("atmID");
                // localStorage.removeItem("balance");

                // this.props.history.push({
                //     pathname: '/login'
                // });
                this.logout();
            })
            .catch((err) => {
                console.log("err", err);
            });
    }

    logout() {
        console.log("Inside logout");
        localStorage.removeItem("userID");
        localStorage.removeItem("atmID");
        localStorage.removeItem("balance");

        this.props.history.push({
            pathname: '/login'
        });
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