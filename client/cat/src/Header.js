import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import './Header.css';

class Header extends Component {

    
    logout = () => {
        localStorage.removeItem('userId')
        console.log("로칼", localStorage)
        this.props.loginState();
        this.props.history.push('/');
    }
    menuset = () => {
        let loginInfo = JSON.parse(localStorage.getItem('userId'));
        let name = loginInfo
        if (localStorage.getItem('userId')) {

            return (
                <div>
                    <div className="head-div">
                        <Link className="head-link" to='/'>Home</Link>
                        <Link className="head-link" to='/info'>Info</Link>
                        <Link className="head-link" to='/donation'>Donation</Link>
                        <Link className="head-link" to='/login'>{name}</Link>
                        <button onClick={this.logout}>Logout</button>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
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

    render() {
        console.log("asdf")
        var menu = this.menuset()
        return (
            <div>
                <h1>길냥이</h1>
                {menu}
            </div>
        )
    }
}
export default withRouter(Header)