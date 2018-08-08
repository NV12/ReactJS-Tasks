import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';
import './Employee.css';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import axios from 'axios';

class AllEmployees extends Component {
    constructor(props) {
        super(props);

        this.state = {
            employeeList: [
                // {
                //     name: "Naeim Vhora",
                //     email: "naeim.for.work@gmail.com",
                //     dob: "08/02/2018"
                // },
                // {
                //     name: "Naeim Vhora 2",
                //     email: "naeim.2for.work@gmail.com",
                //     dob: "09/02/2018"
                // }
            ]
        };
        
        this.saveNewEmployee = this.saveNewEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.removeEmployee = this.removeEmployee.bind(this);
    }

    componentDidMount() {
        axios.get('http://192.168.4.91:3000/employees')
        .then((res) => {
            console.log("Res: ", res);
            const empListFromDB = [];
            res.data.forEach(element => {
                empListFromDB.push({
                    name: element.userName,
                    email: element.email,
                    dob: element.dob
                });
            })
            this.setState({
                employeeList: empListFromDB
            });
        })
        .catch((err) => {
            console.log("Error: ", err);
        })
    }

    saveNewEmployee(employeeObject) {
        const newEmpList = Object.assign(this.state.employeeList);
        newEmpList.push(employeeObject);

        this.setState({
            employeeList: newEmpList        
        });
    }

    editEmployee(newEmployee, oldEmployeeID) {
        const newEmpList = Object.assign(this.state.employeeList);
        newEmpList.splice(oldEmployeeID, 1, newEmployee);

        this.setState({
            employeeList: newEmpList
        });
    }

    removeEmployee(empIndex, event) {
        const newEmpList = Object.assign(this.state.employeeList);
        newEmpList.splice(empIndex, 1);

        this.setState({
            employeeList: newEmpList
        });
    }

    render() {
        const Employees = this.state.employeeList.map((emp, id) => {
            return (
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{emp.name}</td>
                    <td>{emp.email}</td>
                    <td>{emp.dob}</td>
                    <td>
                        <Link to={{
                            pathname: this.props.match.url + "/edit/" + id,
                            state: { empData: this.state.employeeList[id], name: "naeim" }
                        }}>
                            Edit
                        </Link>
                    </td>
                    <td><a onClick={this.removeEmployee.bind(this, id)}  >Delete</a></td>
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
                    <Link to={this.props.match.url + "/new"}>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.handleEmployeeForm} >New Employee</Button>
                        </ButtonToolbar>
                    </Link>
                </div>

                <Route exact path={this.props.match.url + "/new"} render={() => <EmployeeOpr saveEmp={this.saveNewEmployee} />} />
                <Route exact path={this.props.match.url + "/edit/:id"} render={() => <EmployeeOpr editEmp={this.editEmployee} />} />
            </div>
        );
    }
}

export default AllEmployees;