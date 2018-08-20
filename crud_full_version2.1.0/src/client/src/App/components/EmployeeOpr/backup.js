
// import React, { Component } from 'react';
// import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import { withRouter } from 'react-router-dom';
// import axios from 'axios';
// import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from './../../../../node_modules/react-bootstrap';
// import 'react-datepicker/dist/react-datepicker.css';
// import './EmployeeOpr.css';

// class EmployeeOpr extends Component {

//     constructor(props) {
//         super(props);

//         this.state = {
//             startDate: moment(),
//             editEmployeeData: null,
//             fileData: null,
//             newEmp: null
//         };
//         this.handleDateChange = this.handleDateChange.bind(this);
//         this.saveEmployeeInDB = this.saveEmployeeInDB.bind(this);
//         this.saveEmployeeInState = this.saveEmployeeInState.bind(this);
//         this.handleFileChange = this.handleFileChange.bind(this);
//     }

//     componentWillMount() {
//         console.log("History Object: ", this.props.history)
//         if (this.props.match.params.empID) {
//             console.log("Working! ", this.props.match.params.empID);
//             // axios.defaults.withCredentials = true;
//             let config = {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Session-Name': localStorage.getItem('adminEmail'),
//                     'Session-Password': localStorage.getItem('adminPassword')
//                 }
//             }
//             console.log("config: ", config);

//             axios.get('http://localhost:3000/employees/' + this.props.match.params.empID, config)
//                 .then((res) => {
//                     console.log("editEmployeeData: ", res);

//                     const empData = {
//                         empName: res.data.empName,
//                         email: res.data.email,
//                         empID: res.data.empID,
//                         dob: res.data.dob
//                     };

//                     this.setState({
//                         editEmployeeData: empData
//                     });
//                 })
//                 .catch((err) => {
//                     console.log("editEmployeeData error: ", err);
//                 });
//         }
//     }

//     componentWillUnmount() {
//         this.setState({
//             editEmployeeData: null
//         });
//     }

//     handleDateChange(date) {
//         this.setState({
//             startDate: date
//         });
//     }

//     onDrop(acceptedFiles, rejectedFiles) {
//         console.log("accpted files: ", acceptedFiles);
//         console.log("rejected files: ", rejectedFiles);
//         this.uploadedFile = acceptedFiles[0];
//     }

//     handleFileChange(event) {
//         console.log("Event:event.target.files[0] ", event.target.files[0]);
//         const newFile = event.target.files[0];
//         this.setState({
//             fileData: newFile
//         });
//     }

//     saveEmployeeInState(event) {
//         event.preventDefault();
//         console.log("Saving employee in state: ");
//         console.log("Event.target[0].value", event.target[0].value);
//         let newEmployee = {
//             empName: event.target[0].value,
//             email: event.target[1].value,
//             empID: event.target[2].value,
//             dob: event.target[3].value,
//             file: event.target[4].value
//         };
//         console.log("newEmployee: ", newEmployee);

//         this.setState({
//             newEmp: newEmployee
//         });
//         let testEmp = newEmployee;
//         console.log("testEmp: ", testEmp);
//         console.log("this.state.newEmp: ", this.state.newEmp);
//         this.saveEmployeeInDB(event);
//     }
//     // if empID exists, edit employee
//     // else create new emp

//     saveEmployeeInDB(event) {
//         console.log("Inside saveEmployeeInDB");
//         console.log("this.state.newEmp: ", this.state.newEmp);
//         // Edit employee method
//         if (this.props.match.params.empID) {
//             console.log("Inside saveEmp", this.props.match.params.empID);

//             axios({
//                 method: 'put',
//                 url: 'http://localhost:3000/employees/edit/' + this.props.match.params.empID,
//                 data: this.state.newEmp,
//                 headers: {
//                     'Content-Type': 'multipart-formdata',
//                     'Session-Name': localStorage.getItem('adminEmail'),
//                     'Session-Password': localStorage.getItem('adminPassword')
//                 }
//             })
//                 .then((res) => {
//                     console.log("Editing res: ", res);
//                     this.props.history.push({ pathname: '/employees' });
//                 })
//                 .catch((err) => {
//                     console.log("Err: ", err);
//                 });

//         } else {    //New emp method

//             /* THIS METHOD DOESN'T WORK!!!! FormData() */
//             /* DUDE! THIS METHOD DOES WORK!!!! I just don't know how o_0 */
//             /* It works bcz file type in form in an uncontrolled component, we need to use handler for handling form */

//             // const empData = new FormData();
//             // empData.append('empName', event.target[0].value);
//             // empData.append('email', event.target[1].value);
//             // empData.append('empID', event.target[2].value);
//             // empData.append('dob', event.target[3].value);
//             // empData.append('file', this.state.fileData);

//             // console.log("I am FormData", empData); //And I know, you are empty..... in console 

//             axios({
//                 method: 'post',
//                 url: 'http://localhost:3000/employees/new',
//                 data: {
//                     empName: event.target[0].value,
//                     email: event.target[1].value,
//                     empID: event.target[2].value,
//                     dob: event.target[3].value,
//                     file: event.target[4].value
//                 },
//                 headers: {
//                     'Content-Type': 'multipart-formdata',
//                     'Session-Name': localStorage.getItem('adminEmail'),
//                     'Session-Password': localStorage.getItem('adminPassword')
//                 }
//             })
//                 .then((res) => {
//                     console.log("Adding Res: ", res);
//                     this.props.history.push({ pathname: '/employees' });
//                 })
//                 .catch((err) => {
//                     console.log("Err: ", err);
//                 });
//         }
//     }


//     render() {
//         return (
//             <div className="form">
//                 <Form horizontal onSubmit={this.saveEmployeeInState} >

//                     <FormGroup controlId="formHorizontalEmail">
//                         <Col componentClass={ControlLabel} sm={2}>Name</Col>
//                         <Col sm={6}>
//                             <FormControl type="text" placeholder="Name"
//                                 defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.empName : null}
//                                 required />
//                         </Col>
//                     </FormGroup>

//                     <FormGroup>
//                         <Col componentClass={ControlLabel} sm={2}>Email</Col>
//                         <Col sm={6}>
//                             <FormControl type="email" placeholder="Email"
//                                 defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.email : null}
//                                 required />
//                         </Col>
//                     </FormGroup>

//                     <FormGroup controlId="formHorizontalEmail">
//                         <Col componentClass={ControlLabel} sm={2}>ID</Col>
//                         <Col sm={6}>
//                             <FormControl type="number" placeholder="ID should be unique"
//                                 defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.empID : null}
//                                 required />
//                         </Col>
//                     </FormGroup>

//                     <FormGroup controlId="formHorizontalPassword">
//                         <Col componentClass={ControlLabel} sm={2}>Date Of Birth</Col>
//                         <Col sm={6}>
//                             <DatePicker className="datepickerClass"
//                                 selected={this.state.startDate}
//                                 onChange={this.handleDateChange}
//                                 defaultValue={this.state.editEmployeeData ? this.state.editEmployeeData.dob : null}
//                                 required
//                             />
//                         </Col>
//                     </FormGroup>

//                     <FormGroup controlId="formHorizontalEmail">
//                         <Col componentClass={ControlLabel} sm={2}>Photo</Col>
//                         <Col sm={6}>
//                             <FormControl type="file" required />
//                         </Col>
//                     </FormGroup>

//                     <FormGroup>
//                         <Col smOffset={2} sm={10}>
//                             <Button bsStyle="success" type="submit">Save</Button>
//                             <Button bsStyle="info" onClick={this.props.history.goBack}>Back</Button>
//                         </Col>
//                     </FormGroup>

//                 </Form>
//             </div>
//         )
//     }
// }

// export default withRouter(EmployeeOpr);
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
            editEmployeeData: null,
            fileData: null
        };
        this.handleDateChange = this.handleDateChange.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
        // this.fileInput = React.createRef();
        this.handleFileChange = this.handleFileChange.bind(this);
    }

    componentWillMount() {
        console.log("History Object: ", this.props.history)
        if (this.props.match.params.empID) {
            console.log("Working! ", this.props.match.params.empID);
            // axios.defaults.withCredentials = true;
            axios.get('http://localhost:3000/employees/' + this.props.match.params.empID)
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

    onDrop(acceptedFiles, rejectedFiles) {
        console.log("accpted files: ", acceptedFiles);
        console.log("rejected files: ", rejectedFiles);
        this.uploadedFile = acceptedFiles[0];
    }

    handleFileChange(event) {
        console.log("Event:event.target.files[0] ", event.target.files[0]);
        const newFile = event.target.files[0];
        this.setState({
            fileData: newFile
        });
    }

    saveEmployee(event) {
        event.preventDefault();

        // if empID exists, edit employee
        // else create new emp

        // Edit employee method
        if (this.props.match.params.empID) {
            console.log("Inside saveEmp", this.props.match.params.empID);

            axios.put('http://localhost:3000/employees/edit/' + this.props.match.params.empID, {
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

        } else {    //New emp method

            // Creating new emp from form data

            /* THIS METHOD DOESN'T WORK!!!! FormData() */

            /* DUDE! THIS METHOD DOES WORK!!!! I just don't know how o_0 */

            /* It works bcz file type in form in an uncontrolled component, we need to use handler for handling form */
            const empData = new FormData();

            empData.append('empName', event.target[0].value);
            empData.append('email', event.target[1].value);
            empData.append('empID', event.target[2].value);
            empData.append('dob', event.target[3].value);
            empData.append('file', this.state.fileData);
            // empData.append('fileName', this.fileName.value);
            console.log("I am FormData", empData); //And I know, you are empty..... in console 

            axios({
                method: 'post',
                url: 'http://localhost:3000/employees/new',
                data: empData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } }
            })
                .then((res) => {
                    console.log("Adding Res: ", res);
                    this.props.history.push({ pathname: '/employees' });
                })
                .catch((err) => {
                    console.log("Err: ", err);
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
                            <FormControl type="file" onChange={this.handleFileChange} required />
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