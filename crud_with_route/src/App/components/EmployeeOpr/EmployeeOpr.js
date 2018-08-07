import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from './../../../../node_modules/react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeOpr.css';

class EmployeeOpr extends Component {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment()
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.sendEmployee = this.sendEmployee.bind(this);
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    sendEmployee(event) {
        event.preventDefault();
        const newEmp = new this.createEmp(event.target[0].value, event.target[1].value, event.target[2].value);

        if(this.props.location.state) {
            this.props.editEmp(newEmp, this.props.match.params.id);
        }else {
            this.props.saveEmp(newEmp);
        }
        this.props.history.push({ pathname: '/employees' });
    }

    createEmp(name, email, dob) {
        this.name = name;
        this.email = email;
        this.dob = dob;
    }

    render() {
        return (
            <div className="form">         
                <Form horizontal onSubmit={this.sendEmployee} >

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>Name</Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Name"
                                defaultValue={this.props.location.state ? this.props.location.state.empData.name : null} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>Email</Col>
                        <Col sm={6}>
                            <FormControl type="email" placeholder="Email"
                                defaultValue={this.props.location.state ? this.props.location.state.empData.email : null} />
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>Date Of Birth</Col>
                        <Col sm={6}>
                            <DatePicker className="datepickerClass"
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                defaultValue={this.props.location.state ? this.props.location.state.empData.dob : null}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="success" type="submit">Save</Button>
                        </Col>
                    </FormGroup>
                </Form>
            </div>
        )
    }
}

export default withRouter(EmployeeOpr);