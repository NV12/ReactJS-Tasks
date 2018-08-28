import React, { PureComponent } from 'react';
import { Table, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import './Employee.css';

import { Link } from 'react-router-dom';
import withRouter from 'react-router-dom/withRouter';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

class AllEmployees extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            employeeList: [],
            modalShow: false,
            deleteEmpIndex: null
        };

        this.removeEmployee = this.removeEmployee.bind(this);
        this.fetchEmployees = this.fetchEmployees.bind(this);
        this.handleModalShow = this.handleModalShow.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);

    }

    handleModalClose() {
        console.log("Inside handleModalClose");
        this.setState({
            modalShow: false
        });
    }

    handleModalShow(empID, event) {
        console.log("Inside handleModalShow");
        
        this.setState({
            deleteEmpIndex: empID,
            modalShow: true
        });
    }

    componentWillMount() {
        console.log("Inside componentWillMount: ");
        console.log("History obj", this.props.location.state);
        // Modal.setAppElement(document.getElementById('root'));
        if (this.props.location.state) {
            if (this.props.location.state.newEmpStatus) {
                this.notify('newEmpSuccess', this.props.location.state.newEmpName);
                this.props.location.state.newEmpName = null;
            }

            if (this.props.location.state.editEmpStatus) {
                this.notify('editEmpSuccess', this.props.location.state.editEmpName);
                this.props.location.state.editEmpName = null;
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
                        dob: element.dob,
                        imageName: element.imgName
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

        this.handleModalClose();

        console.log("Inside removeEmployee");
        let config = {
            headers: {
                'Content-Type': 'application/json',
                'Session-Name': localStorage.getItem('adminEmail'),
                'Session-Password': localStorage.getItem('adminPassword')
            }
        }
        console.log("config: ", config);

        axios.delete('http://localhost:3000/employees/' + this.state.deleteEmpIndex, config)
            .then((res) => {
                console.log("Inside delete res: ", res);

                this.notify('deleteEmpSuccess', res.data.empName);
                this.fetchEmployees();
            })
            .catch((err) => {
                console.log("Delete Error: ", err);
                this.notify('deleteEmpError');
            });

        // this.setState({
        //     deleteEmpIndex: null
        // })
    }

    render() {
        // window.alert("Freeze!");
        console.log("Inside all employee render!", this.state.employeeList);
        const Employees = this.state.employeeList.map((emp, id) => {
            return (
                <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{emp.empName}</td>
                    <td>
                        <LazyLoadImage
                            src={"/" + emp.imageName}
                            effect="blur"
                            alt=""
                            height="100"
                            width="100"
                        />
                    </td>
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
                    <td><a onClick={this.handleModalShow.bind(this, emp.empID)}  >Delete</a></td>

                </tr>
            );
        })

        return (

            <div>
                <Modal show={this.state.modalShow} onHide={this.handleModalClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Box</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Do you really want to delete this employee? </h4>
                        <p>
                            This task can't be undo
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleModalClose}>No</Button>
                        <Button bsStyle="danger" onClick={this.removeEmployee}>Yes</Button>
                    </Modal.Footer>
                </Modal>
                <Table responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: "center" }} >#</th>
                            <th style={{ textAlign: "center" }} >Name</th>
                            <th style={{ textAlign: "center" }} >Image</th>
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
                {/* <ToastContainer autoClose={2500} /> */}
            </div>
        );
    }
}

export default withRouter(AllEmployees);