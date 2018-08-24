import React, { PureComponent } from 'react';
import { Table } from 'react-bootstrap';
// import EmployeeOpr from '../EmployeeOpr/EmployeeOpr';
import './Employee.css';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import withRouter from 'react-router-dom/withRouter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AllEmployees extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            employeeList: []
        };

        this.removeEmployee = this.removeEmployee.bind(this);
        this.fetchEmployees = this.fetchEmployees.bind(this);

    }

    componentWillMount() {
        console.log("Inside componentWillMount: ");
        console.log("History obj", this.props.location.state);
        if (this.props.location.state) {
            if (this.props.location.state.newEmpStatus) {
                this.notify('newEmpSuccess', this.props.location.state.newEmpName);
                this.props.location.state.newEmpName = null;
            }

            if (this.props.location.state.editEmpStatus) {
                this.notify('editEmpSuccess', this.props.location.state.editEmpName);
            }
        }
    }
    componentDidMount() {
        console.log("Inside componentDidMount");
        this.fetchEmployees();
    }

    notify(status, name) {
        console.log("Inside notify");
        console.log("name: ", name);

        switch (status) {
            case 'newEmpSuccess':
                toast.success(name + " added successfully !", {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            case 'editEmpSuccess':
                toast.success(name + " edited successfully !", {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            case 'deleteEmpSuccess':
                toast.success(name + " deleted successfully !", {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            case 'deleteEmpError':
                toast.error("Could not delete " + name + " !", {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            default:
                console.log("Default success");
                break;
        }
    }

    fetchEmployees() {
        console.log("Inside fetchEmployees");
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Session-Name': localStorage.getItem('adminEmail'),
                'Session-Password': localStorage.getItem('adminPassword')
            }
        }
        // console.log("config: ", config);
        axios.get('http://localhost:3000/employees', config)
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
        let ans;
        ans = window.prompt("Hey, are sure you want to delete this? y or n \n NOTE:It took many key strokes to add this dummy employee");
        
        console.log("Your answer: ", ans);

        if(ans==='n')   return;
        // else {}
        
        console.log("Inside removeEmployee");
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Session-Name': localStorage.getItem('adminEmail'),
                'Session-Password': localStorage.getItem('adminPassword')
            }
        }
        console.log("config: ", config);

        axios.delete('http://localhost:3000/employees/' + empIndex, config)
            .then((res) => {
                console.log("Inside delete res: ", res);

                this.notify('deleteEmpSuccess', res.data.empName);
                this.fetchEmployees();
            })
            .catch((err) => {
                console.log("Delete Error: ", err);
                this.notify('deleteEmpError');
            });
    }

    render() {
        // window.alert("Freeze!");
        console.log("Inside all employee render!", this.state.employeeList);
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
                        <Button bsStyle="primary" onClick={this.handleEmployeeForm} >New Employee</Button>
                    </Link>
                </div>
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

export default withRouter(AllEmployees);