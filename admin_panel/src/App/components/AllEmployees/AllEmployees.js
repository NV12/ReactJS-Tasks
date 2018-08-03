import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';
import './Employee.css';
import { ButtonToolbar, Button } from 'react-bootstrap';

class AllEmployees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeList: [
                {
                    id: 1,
                    name: "Naeim Vhora",
                    email: "naeim.for.work@gmail.com",
                    dob: "08/02/2018"
                },
                {
                    name: "Naeim Vhora 2",
                    email: "naeim.2for.work@gmail.com",
                    dob: "09/02/2018"
                }
            ],
            showEmployeeForm: false,
            editEmployee: false
        };
        this.handleEmployeeForm = this.handleEmployeeForm.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);

    }

    handleEmployeeForm() {
        if (!this.state.showEmployeeForm) {
            this.setState({
                showEmployeeForm: true
            });
        } else {
            this.setState({
                showEmployeeForm: false
            });
        }
    }

    editEmployee(id) {
        if (!this.state.editEmployee) {
            this.setState({
                editEmployee: true
            });
        } else {
            this.setState({
                editEmployee: false
            });
        }
        this.editID = id;
    }

    saveEmployee(employeeObject, oldEmployee) {

        const newEmpList = Object.assign(this.state.employeeList);
        
        console.log("oldEmployee: ", oldEmployee);
        newEmpList.push(employeeObject);

        console.log("Before: ", this.state);
        this.setState({
            employeeList: newEmpList,
            showEmployeeForm: false
        });
        console.log("After: ", this.state);
    }

    render() {

        const Employees = this.state.employeeList.map((emp, id) => {
            return (
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.dob}</td>
                    <td><a href="#" onClick={this.editEmployee.bind({ id })} >Edit</a></td>
                    <td><a href="#">Delete</a></td>
                </tr>
            );
        })

        return (
            <div>
                <Table responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }} >#</th>
                            <th style={{ textAlign: "center" }} >Name</th>
                            <th style={{ textAlign: "center" }} >emailID</th>
                            <th style={{ textAlign: "center" }} >DOB</th>
                            <th style={{ textAlign: "center" }} colSpan="2" >Operations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Employees}
                    </tbody>
                </Table>

                <div>
                    <ButtonToolbar>
                        <Button bsStyle="primary" onClick={this.handleEmployeeForm} >New Employee</Button>
                    </ButtonToolbar>
                    {this.state.showEmployeeForm ? <EmployeeOpr saveEmp={this.saveEmployee} /> : null}
                    {this.state.editEmployee ? <EmployeeOpr empData={this.state.employeeList[this.editID] } saveEmp={this.saveEmployee} /> : null}
                </div>
            </div>
        );
    }
}

export default AllEmployees;