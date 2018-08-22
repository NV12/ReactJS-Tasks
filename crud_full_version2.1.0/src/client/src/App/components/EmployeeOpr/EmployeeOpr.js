import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from './../../../../node_modules/react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeOpr.css';

class EmployeeOpr extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            editEmployeeData: null,
            fileData: null,
            file: null,
            fileName: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentWillMount() {
        console.log("History Object: ", this.props)
        if (this.props.match.params.empID) {
            
            // Setting the headers for the axios request
            let config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Name': localStorage.getItem('adminEmail'),
                    'Session-Password': localStorage.getItem('adminPassword')
                }
            }
            
            // Filling the form with data of employee to be updated
            axios.get('http://localhost:3000/employees/' + this.props.match.params.empID, config)
                .then((res) => {
                    console.log("editEmployeeData: ", res);

                    const empData = {
                        empName: res.data.empName,
                        email: res.data.email,
                        empID: res.data.empID,
                        dob: res.data.dob,
                        imgName: res.data.imgName
                    };

                    this.setState({
                        editEmployeeData: empData,
                        fileName: res.data.imgName
                    });                

                })
                .catch((err) => {
                    console.log("editEmployeeData error: ", err);
                });
        }
    }

    componentWillUnmount() {
        console.log("Inside componentWillUnmount!111111111111111111111111111111111");
        this.setState({
            editEmployeeData: null
        });
    }

    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleFileChange(event) {
        console.log("Event:event.target.files[0] ", event.target.files[0]);
        const newFile = event.target.files[0];

        //  Make changes in file only if file is changed not when it is empty
        if (newFile) {
            console.log("File is changed: ")
            this.setState({
                fileData: newFile,
                file: URL.createObjectURL(newFile)
            });
        } else {    
            // Removing the file from image if user cancels the upload
            console.log("File is not changed: ")
            this.setState({
                fileData: newFile,
                file: null
            });
        }
    }

    saveEmployee(event) {
        event.preventDefault();
        console.log("Inside saveEmployee");
        // if empID exists, edit employee
        // else create new emp
        const empData = new FormData();

        empData.append('empName', event.target[0].value);
        empData.append('email', event.target[1].value);
        empData.append('empID', event.target[2].value);
        empData.append('dob', event.target[3].value);
        
        // Append file in empData, only if it is changed
        if(this.state.fileData) {
            // console.log("File data exists!");
            empData.append('file', this.state.fileData);
            empData.append('fileName', this.state.fileData.name);
            empData.append('oldFileName', this.state.fileName);
        } else {
            // console.log("File data does not exist!");
            empData.append('nofile', true);
            empData.append('fileName', this.state.fileName);
        }
        
        // Setting the headers for the axios request        
        let axiosHeaders = {
            'Content-Type': 'multipart/form-data',
            'Session-Name': localStorage.getItem('adminEmail'),
            'Session-Password': localStorage.getItem('adminPassword')
        };

        // Edit employee method
        if (this.props.match.params.empID) {
            console.log("Inside edit employee method");

            axios({
                method: 'put',
                url: 'http://localhost:3000/employees/edit/' + this.props.match.params.empID,
                data: empData,
                headers: axiosHeaders
            })
                .then((res) => {
                    console.log("Editing res: ", res);
                    window.alert("Employee updated successfully!");
                    this.props.history.push({ pathname: '/employees' });
                })
                .catch((err) => {
                    window.alert("Error in updating employee!");
                    console.log("Err: ", err);
                });

        } else {    //New emp method
            // Creating new emp from form data

            /* THIS METHOD DOESN'T WORK!!!! FormData() */
            /* DUDE! THIS METHOD DOES WORK!!!! I just don't know how o_0 */
            /* It works bcz file type in form in an uncontrolled component, we need to use handler for handling form */

            console.log("Inside new employee method");
            
            axios({
                method: 'post',
                url: 'http://localhost:3000/employees/new',
                data: empData,
                headers: axiosHeaders
            })
                .then((res) => {
                    console.log("Adding Res: ", res);
                    window.alert("Employee added successfully!");
                    this.props.history.push({ pathname: '/employees' });
                })
                .catch((err) => {
                    console.log("Err: ", err);
                    window.alert("Error in creating new employee!");
                });
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

                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>Photo</Col>
                        <Col sm={6}>
                            <FormControl
                                type="file"
                                onChange={this.handleFileChange}
                                required= {window.location.href === "http://localhost:3001/employees/new" ? true : false}
                                accept="image/*"
                            />
                            {/* <img src={this.state.file} alt=""  /> */}
                            {console.log("this.state.file", this.state.file)}
                            {console.log("this.state.fileName", this.state.fileName)}
                            <img src={ this.state.file == null ? "/" + this.state.fileName : this.state.file } name="myImg" alt="" />

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