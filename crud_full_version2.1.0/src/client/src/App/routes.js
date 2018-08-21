import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import AllEmployees from './components/AllEmployees/AllEmployees';
import EmployeeOpr from './components/EmployeeOpr/EmployeeOpr';
import Login from './components/Login/Login';
import Redirect from 'react-router-dom/Redirect';

class Routes extends Component {

    isAuthenticated() {
        // console.log("Inside isAuthenticated");
        if (localStorage.getItem('adminEmail')) return true;
        else {
            window.alert("You are not logged in..!");
            return false;
        }
    }

    isAuthenticatedCompact(props, NewComponent) {
        // console.log("Inside isAuthenticatedCompact");

        if (localStorage.getItem('adminEmail')) {
            return <NewComponent {...props} />
        }
        else {
            window.alert("You are not logged in..!")
            return <Redirect to="/login" />
        }
    }

    render() {
        return (
            <main>

                <BrowserRouter>
                    <div>
                        <NavBar />
                        <Switch>

                             <Route exact path='/login' render={() => (
                                <Login loginMethod={this.onLogin} />
                            )} />
                            
                            <Route exact path='/' render={(props) => (
                                this.isAuthenticated() ?<h1>Welcome to Admin Portal!</h1> : <Redirect to="/login" />
                            )} />

                            <Route exact path='/settings' render={(props) => (
                                this.isAuthenticated() ?<h1>Settings</h1> : <Redirect to="/login" />
                            )} />

                            <Route exact path='/employees' render={(props) => (
                                this.isAuthenticatedCompact(props, AllEmployees)
                            )} />

                            <Route exact path='/employees/new' render={(props) => (
                                this.isAuthenticatedCompact(props, EmployeeOpr)
                            )} />

                            <Route exact path='/employees/edit/:empID' render={(props) => (
                                this.isAuthenticatedCompact(props, EmployeeOpr)
                            )} />

                        </Switch>
                    </div>
                </BrowserRouter>
            </main>
        );
    }
}

export default Routes;