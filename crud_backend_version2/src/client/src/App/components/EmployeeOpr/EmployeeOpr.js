import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from './../../../../node_modules/react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeOpr.css';

class EmployeeOpr extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            editEmployeeData: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentWillMount() {
        console.log("History Object: ", this.props.history)
        if (this.props.match.params.empID) {
            console.log("Working! ", this.props.match.params.empID);

            axios.get('http://192.168.4.91:3000/employees/' + this.props.match.params.empID)
                .then((res) => {
                    console.log("editEmployeeData: ", res);

                    const empData = {
                        empName: res.data.empName,
                        email: res.data.email,
                        empID: res.data.empID,
                        dob: res.data.dob
                    };

                    this.setState({
                        editEmployeeData: empData
                    });
                })
                .catch((err) => {
                    console.log("editEmployeeData error: ", err);
                });
        }
    }

    componentWillUnmount() {
        this.setState({
            editEmployeeData: null
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    saveEmployee(event) {
        event.preventDefault();

        if (this.props.match.params.empID) {
            console.log("Inside saveEmp", this.props.match.params.empID);

            // Sending edited Employee to database
            axios.put('http://192.168.4.91:3000/employees/edit/' + this.props.match.params.empID, {
                empName: event.target[0].value,
                email: event.target[1].value,
                empID: event.target[2].value,
                dob: event.target[3].value
            })
                .then((res) => {
                    console.log("Editing res: ", res);
                    this.props.history.push({ pathname: '/employees' });
                })
                .catch((err) => {
                    console.log("Err: ", err);
                });

        } else {

            axios.post('http://192.168.4.91:3000/employees/new', {
                empName: event.target[0].value,
                email: event.target[1].value,
                empID: event.target[2].value,
                dob: event.target[3].value
            })
                .then((res) => {
                    console.log("Adding Res: ", res);
                    this.props.history.push({ pathname: '/employees' });
                })
                .catch((err) => {
                    console.log("Err: ", err);
                })
        }

    }

    render() {
        return (
            <div className="form">
                <Form horizontal onSubmit={this.saveEmployee} >

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>Name</Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Name"
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.empName : null}
                                required />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Email</Col>
                        <Col sm={6}>
                            <FormControl type="email" placeholder="Email"
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.email : null}
                                required />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>ID</Col>
                        <Col sm={6}>
                            <FormControl type="number" placeholder="ID should be unique"
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.empID : null}
                                required />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>Date Of Birth</Col>
                        <Col sm={6}>
                            <DatePicker className="datepickerClass"
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.dob : null}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="success" type="submit">Save</Button>
                            <Button bsStyle="info" onClick={this.props.history.goBack}>Back</Button>
                        </Col>
                    </FormGroup>

                </Form>
            </div>
        )
    }
}

export default withRouter(EmployeeOpr);