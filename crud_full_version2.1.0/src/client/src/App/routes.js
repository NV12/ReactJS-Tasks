import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AllEmployees from './components/AllEmployees/AllEmployees';
import EmployeeOpr from './components/EmployeeOpr/EmployeeOpr';
import Login from './components/Login/Login';
import Redirect from 'react-router-dom/Redirect';

class Routes extends Component {

    isAuthenticated() {
        console.log("Inside requireAuth");
        console.log("localStorage.getItem('adminEmail')", localStorage.getItem('adminEmail'));
        if (localStorage.getItem('adminEmail')) return true
        else {
            window.alert("Dude! Login first...!")
            return false;
        }
    }

    render() {
        return (
            <main>
                
                <BrowserRouter>
                    <div>
                        <NavBar />
                        <Switch>
                            
                            <Route exact path='/employees' render={(props) => (
                                this.isAuthenticated() ? (
                                    <AllEmployees {...props}/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            )} />
                            
                            <Route exact path='/employees/new' render={(props) => (
                                this.isAuthenticated() ? (
                                    <EmployeeOpr {...props}/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            )}  />
                            
                            <Route exact path='/employees/edit/:empID' render={(props) => (
                                this.isAuthenticated() ? (
                                    <EmployeeOpr {...props}/>
                                ) : (
                                    <Redirect to="/login"/>
                                )
                            )} />

                            <Route exact path='/login' render={() => (
                                <Login loginMethod={this.onLogin} />
                            )} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </main>
        );
    }
}

export default Routes;