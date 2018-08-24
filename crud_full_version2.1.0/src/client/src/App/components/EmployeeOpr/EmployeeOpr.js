import React, { PureComponent } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import './EmployeeOpr.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class EmployeeOpr extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            editEmployeeData: null,
            fileData: null, // for storing file that is being uploaded
            file: null,     //for showing image that is being changed
            fileName: null,  //For storing file name of employee being edited
            formValidation: {
                "empName": null,
                "email": null,
                "empID": null,
                "dob": null,
                "file": null
            }
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

    notify(status, error) {
        console.log("Inside notify");
        console.log("error: ", error);

        switch (status) {
            case 'editEmpError':
                toast.error("Could not edit employee " + error + " !", {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            case 'newEmpError':
                toast.error("Could not create new Employee " + error + " !", {
                    position: toast.POSITION.TOP_CENTER
                });
                break;

            default:
                toast.error("Unknown error occured!", {
                    position: toast.POSITION.TOP_CENTER
                });

                break;
        }
    }


    // componentWillUnmount() {

    //     console.log("Inside componentWillUnmount!");
    //     // window.alert("YO!");
    //     this.setState({
    //         editEmployeeData: null
    //     });
    // }


    handleDateChange(date) {
        this.setState({
            startDate: date
        });
    }

    handleFileChange(event) {
        console.log("Event:event.target.files[0] ", event.target.files[0]);
        const newFile = event.target.files[0];
        let validateFieldsData = this.state.formValidation;
        //  Make changes in file only if file is changed not when it is empty
        if (newFile) {
            console.log("File is changed: ")

            // show no validation error when file input is not empty
            validateFieldsData.file = null;
            this.setState({
                fileData: newFile,
                file: URL.createObjectURL(newFile),
                formValidation: validateFieldsData
            });
        } else {
            console.log("File is not changed: ")

            // Image can not be accepted as empty if it is new empoyee page
            if (window.location.href === "http://localhost:3001/employees/new") {
                validateFieldsData.file = "Image can't be empty"
            } else {
                // Image can be empty on edit page as image already exists on server 
                validateFieldsData.file = null;
            }

            // Removing the file from image form img if user cancels the upload
            this.setState({
                fileData: newFile,
                file: null,
                formValidation: validateFieldsData
            });
        }
    }

    validateFields(event) {
        console.log("Inside validateFields");

        const errorMessage = {
            "empName": null,
            "email": null,
            "empID": null,
            "dob": null,
            "file": null
        }
        let validateStatus = true;

        // console.log("event.empName.value", event.empName.value);
        if (!event.empName.value) {
            console.log("empName is null");
            errorMessage.empName = "Name can't be empty";
            validateStatus = false;
        }

        if (!event.email.value) {
            console.log("email is null");
            errorMessage.email = "Email can't be empty";
            validateStatus = false;
        }

        if (!event.empID.value) {
            console.log("empID is null");
            errorMessage.empID = "ID can't be empty"
            validateStatus = false;
        }

        if (!event.dob.value) {
            console.log("dob is null");
            errorMessage.dob = "Date of birth can't be empty"
            validateStatus = false;
        }

        // Image is required for new employee not for edit employee
        if (window.location.href === "http://localhost:3001/employees/new" && !this.state.fileData) {
            console.log("Image is null");
            errorMessage.file = "Image can't be empty"
            validateStatus = false;
        }

        // Update state only if there is any vaidation needed
        // We need to nullify all the older validations so we need to set formValidation obj to null

        this.setState({
            formValidation: errorMessage
        });

        return validateStatus;
    }

    saveEmployee(event) {
        event.preventDefault();
        console.log("Inside saveEmployee");

        // Validating form for empty fields before starting submit 
        if (!this.validateFields(event.target)) return;
        console.log("Vaidated!");

        /*  Logic: if empID exists, edit employee */
        /*        else create new emp             */

        const empData = new FormData();

        empData.append('empName', event.target[0].value);
        empData.append('email', event.target[1].value);
        empData.append('empID', event.target[2].value);
        empData.append('dob', event.target[3].value);

        // Append file in empData, only if it is changed
        if (this.state.fileData) {
            console.log("File data exists!");
            empData.append('file', this.state.fileData);
            empData.append('fileName', this.state.fileData.name);
            empData.append('oldFileName', this.state.fileName);
        } else {
            console.log("File data does not exist!");
            empData.append('nofile', true);
            empData.append('fileName', this.state.fileName);
        }

        // Setting the headers for the axios request        
        let axiosHeaders = {
            'Content-Type': 'multipart/form-data',
            'Session-Name': localStorage.getItem('adminEmail'),
            'Session-Password': localStorage.getItem('adminPassword')
        };

        /* Edit employee method */

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
                    // console.log()
                    // window.alert("Employee updated successfully!");
                    this.props.history.push({
                        pathname: '/employees',
                        state: {
                            editEmpStatus: true,
                            editEmpName: res.data.empName
                        }
                    });
                })
                .catch((err) => {
                    // console.log("err", err);
                    let errorMessageObj = { ...this.state.formValidation };

                    if (err.response.data.errorMessage.indexOf('email') !== -1)
                        errorMessageObj.email = err.response.data.errorMessage;
                    else if (err.response.data.errorMessage.indexOf('ID') !== -1)
                        errorMessageObj.empID = err.response.data.errorMessage;
                    else
                        window.alert(err.response.data.errorMessage);
                    // this.notify('editEmpError', err.response.data.errorMessage);


                    this.setState({
                        formValidation: errorMessageObj
                    });

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

                    // window.alert("Employee added successfully!");
                    this.props.history.push({
                        pathname: '/employees',
                        state: {
                            newEmpStatus: true,
                            newEmpName: res.data.empName
                        }
                    });
                })
                .catch((err) => {
                    console.log("Err message new: ", err.response);
                    // window.alert(err.response.data.errorMessage);
                    let errorMessageObj = { ...this.state.formValidation };

                    if (err.response.data.errorMessage.indexOf('email') !== -1)
                        errorMessageObj.email = err.response.data.errorMessage;
                    else if (err.response.data.errorMessage.indexOf('ID') !== -1)
                        errorMessageObj.empID = err.response.data.errorMessage;
                    else
                        window.alert(err.response.data.errorMessage);
                    // this.notify('newEmpError', err.response.data.errorMessage);


                    this.setState({
                        formValidation: errorMessageObj
                    });

                });
        }

    }

    render() {
        return (
            <div className="form">

                <Form horizontal onSubmit={this.saveEmployee} >

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Name</Col>
                        <Col sm={6}>
                            <FormControl type="text" placeholder="Name" name="empName"
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.empName : null}
                            />
                            <span style={{ color: "red" }}>{this.state.formValidation["empName"]}</span>

                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Email</Col>
                        <Col sm={6}>
                            <FormControl type="email" placeholder="Email" name="email"
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.email : null}
                            />
                            {console.log("this.state.formValidation['email']", this.state.formValidation['email'])}
                            <span style={{ color: "red" }}>{this.state.formValidation["email"]}</span>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>ID</Col>
                        <Col sm={6}>
                            <FormControl type="number" placeholder="ID should be unique" name="empID"
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.empID : null}
                            />
                            <span style={{ color: "red" }}>{this.state.formValidation["empID"]}</span>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Date Of Birth</Col>
                        <Col sm={6}>
                            <DatePicker className="datepickerClass"
                                name="dob"
                                selected={this.state.startDate}
                                onChange={this.handleDateChange}
                                defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.dob : null}
                            />
                            <span style={{ color: "red" }}>{this.state.formValidation["dob"]}</span>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>Photo</Col>
                        <Col sm={6}>
                            <FormControl
                                name="file"
                                type="file"
                                onChange={this.handleFileChange}
                                // required={window.location.href === "http://localhost:3001/employees/new" ? true : false}
                                accept="image/*"
                            />
                            <span style={{ color: "red" }}>{this.state.formValidation["file"]}</span>
                            <img src={this.state.file == null ? "/" + this.state.fileName : this.state.file} name="myImg" alt="" />

                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button bsStyle="success" type="submit" >Save</Button>
                            <Button bsStyle="info" onClick={this.props.history.goBack}>Back</Button>
                        </Col>
                    </FormGroup>

                </Form>
                {/* Adding below doesn't work */}
                {/* <ToastContainer autoClose={2500} /> */}
            </div>
        )
    }
}

export default withRouter(EmployeeOpr);