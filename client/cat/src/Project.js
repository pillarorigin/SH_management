import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './Header';
import Home from './content/Home';
import Info from './content/Info';
import Donation from './content/Donation';
import Transaction from './content/Transaction';
import Login from './content/Login';
import Sign from './content/Sign';

export default class Project extends Component{
    render(){
        return(
            <BrowserRouter>
            <div>
            <Header />
            </div>
            <Switch>
                <Route exact to path = '/' component={Home} />
                <Route path = '/info' component={Info} />
                <Route path = '/donation' component={Donation} />
                <Route path = '/transaction' component={Transaction} />
                <Route path = '/login' component={Login} />
                <Route path = '/sign' component={Sign} />
            </Switch>
            </BrowserRouter>
        )
    }
}