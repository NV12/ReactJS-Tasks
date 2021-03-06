import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from './../../../../node_modules/react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeOpr.css';

class EmployeeOpr extends Component {

    constructor(props) {
        super(props)
        this.state = {
            startDate: moment()
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.empData = props.empData;
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    saveEmployee(event) {
        event.preventDefault();

        const newEmp = {
            name: event.target[0].value,
            email:event.target[1].value,
            dob:event.target[2].value
        }
        this.props.saveEmp(newEmp, this.props.empID);
    }

    render() {
        return (
            <div className="form">
                {this.empData ? console.log("YES", this.empData) : null}
                <Form horizontal onSubmit={this.saveEmployee} >

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>Name</Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Name" defaultValue={this.empData ? this.empData.name : null}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>Email</Col>
                        <Col sm={6}>
                            <FormControl type="email" placeholder="Email" defaultValue={this.empData ? this.empData.email : null}/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>Date Of Birth</Col>
                        <Col sm={6}>
                            <DatePicker className="datepickerClass"
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                defaultValue={this.props.empData ? this.props.empData.dob : null}
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

export default EmployeeOpr;