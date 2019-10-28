import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1>길냥이</h1>
                <div className="head-div">
                <Link className="head-link" to='/'>Home</Link>
                <Link className="head-link" to='/info'>Info</Link>
                <Link className="head-link" to='/donation'>Donation</Link>
                <Link className="head-link" to='/login'>Login</Link>
                <Link className="head-link" to='/sign'>Sign</Link>
                </div>
            </div>
        )
    }
}
