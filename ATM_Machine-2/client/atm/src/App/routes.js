import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from './components/Login/login';
import Dashboard from './components/Dashboard/dashboard';
// import Redirect from 'react-router-dom/Redirect';

class Routes extends Component {

    // isAuthenticated() {
    //     // console.log("Inside isAuthenticated");
    //     if (localStorage.getItem('adminEmail')) return true;
    //     else {
    //         window.alert("You are not logged in..!");
    //         return false;
    //     }
    // }

    // isAuthenticatedCompact(props, NewComponent) {
    //     // console.log("Inside isAuthenticatedCompact");

    //     if (localStorage.getItem('adminEmail')) {
    //         return <NewComponent {...props} />
    //     }
    //     else {
    //         window.alert("You are not logged in..!")
    //         return <Redirect to="/login" />
    //     }
    // }

    render() {
        return (
            <main>

                <BrowserRouter>
                    <div>
                        {/* // <NavBar /> */}
                        <Switch>

                             <Route exact path='/login' render={() => (
                                <Login />
                            )} />
                            <Route exact path='/dashboard' render={() => (
                                <Dashboard />
                            )} />

                          {/*  <Route exact path='/' render={(props) => (
                                this.isAuthenticated() ?<h1>Welcome to Admin Portal!</h1> : <Redirect to="/login" />
                            )} /> */}


                            {/* Setting default route */}
                            {/* <Redirect to="/" /> */}
                        </Switch>
                    </div>
                </BrowserRouter>
            </main>
        );
    }
}

export default Routes;