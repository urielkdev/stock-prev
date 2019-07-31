import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Header from './header/Header';
import HomePage from './home/HomePage';
import CreateUserPage from './user/create/CreateUserPage';
import ShowUserPage from './user/show/ShowUserPage';
import EditUserPage from './user/edit/EditUserPage';
import OperationsHistoryPage from './user/operation/history/OperationsHistoryPage';

class App extends Component {

    render() {
        return (
            <div style={{height: '100%'}}>
                <Router history={history}>
                        <Header />
                        <div style={{height: '90%'}}>
                            <Switch>
                                    <Route path="/" exact component={HomePage} />
                                    <Route path="/users/create" exact component={CreateUserPage} />
                                    <Route path="/users/:id" exact component={ShowUserPage} />
                                    <Route path="/users/:id/edit" exact component={EditUserPage} />
                                    <Route path="/users/:id/operations/history" exact component={OperationsHistoryPage} />
                            </Switch>
                        </div>
                </Router>
            </div>
        );
    }
}

export default App;