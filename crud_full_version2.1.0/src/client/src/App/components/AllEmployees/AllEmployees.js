import React, { PureComponent } from 'react';
import { Table } from 'react-bootstrap';
// import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';
import './Employee.css';
import { ButtonToolbar, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

class AllEmployees extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            employeeList: []
        };

        this.removeEmployee = this.removeEmployee.bind(this);
        this.fetchEmployees = this.fetchEmployees.bind(this);
    }

    componentDidMount() {
        console.log("Inside componentDidMount");
        this.fetchEmployees();
    }

    fetchEmployees() {
        console.log("Inside fetchEmployees");

        axios.get('http://192.168.4.91:3000/employees')
            .then((res) => {
                console.log("All Employees: ", res);

                const empListFromDB = [];
                res.data.forEach(element => {
                    empListFromDB.push({
                        empName: element.empName,
                        email: element.email,
                        empID: element.empID,
                        dob: element.dob
                    });
                })
                this.setState({
                    employeeList: empListFromDB
                });
            })
            .catch((err) => {
                console.log("Error: ", err);
            });
    }

    removeEmployee(empIndex, event) {

        console.log("Inside removeEmployee");
        axios.delete('http://192.168.4.91:3000/employees/' + empIndex)
            .then((res) => {
                console.log("Inside delete res: ", res);
                this.fetchEmployees();
            })
            .catch((err) => {
                console.log("Delete Error: ", err);
            });
    }

    render() {
        const Employees = this.state.employeeList.map((emp, id) => {
            return (
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{emp.empName}</td>
                    <td>{emp.email}</td>
                    <td>{emp.empID}</td>
                    <td>{emp.dob}</td>
                    <td>
                        <Link to={{
                            pathname: this.props.match.url + "/edit/" + emp.empID
                        }}>
                            Edit
                        </Link>
                    </td>
                    <td><a onClick={this.removeEmployee.bind(this, emp.empID)}  >Delete</a></td>
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
                            <th style={{ textAlign: "center" }} >ID</th>
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
            </div>
        );
    }
}

export default AllEmployees;