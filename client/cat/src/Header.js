import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div>
                <h1>길냥이</h1>
                <Link to='/'>Home</Link>
                <Link to='/info'>info</Link>
                <Link to='/donation'>donation</Link>
                <Link to='/login'>login</Link>
                <Link to='/sign'>Sign</Link>
            </div>
        )
    }
}
