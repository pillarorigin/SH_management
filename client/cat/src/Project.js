import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Header from './Header';
import Home from './content/Home';
import Info from './content/Info';
import Donation from './content/Donation';
import Transaction from './content/Transaction';
import Login from './content/Login';
import Sign from './content/Sign';
import Mypage from './content/Mypage';
import Errorpage from './Errorpage';


export default class Project extends Component{
    state={
        login: false
    }
loginState = () =>{
    this.setState({
        login: !this.state.login
    })
}


    render(){
        return(
            <BrowserRouter>
            <div>
            <Header loginState={this.loginState} />
            </div>
            <Switch>
                <Route exact to path = '/' component={Home} />
                <Route path = '/info' component={Info} />
                <Route path = '/donation' component={Donation} />
                <Route path = '/transaction' component={Transaction} />
                {/* <Route path = '/login' component={Login} />*/}
                <Route path="/login" component={() => <Login loginState={this.loginState}/>}/>
                <Route path = '/sign' component={Sign} />
                <Route path='/mypage' component={Mypage} />
                <Route component={Errorpage} />
            </Switch>
            </BrowserRouter>
        )
    }
}