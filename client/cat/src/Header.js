import React, { Component } from 'react';
import { Link , withRouter} from 'react-router-dom';
import './Header.css';
import Axios from 'axios';

class Header extends Component {

    
    logout = () => {
        localStorage.removeItem('userId');
        this.props.loginState();
        this.props.history.push('/');
    }
    list = () =>{
        const name = JSON.parse(localStorage.getItem('userId'));
        const url = `http://localhost:4000/users/${name}`;
        const data = {
            userId : name
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        Axios.get(url,data,config)
        .then((response) => {
            console.log('res',response)
            localStorage.setItem('data',JSON.stringify(response.data.result[0]))
            console.log(localStorage)
            this.props.history.push('/mypage')
        })
        .catch((error)=>{
            console.log(error)
        })
    }
    menuset = () => {
        if (localStorage.getItem('userId')) {

            return (
                <div>
                    <div className="head-div">
                        <Link className="head-link" to='/'>Home</Link>
                        <Link className="head-link" to='/info'>Info</Link>
                        <Link className="head-link" to='/donation'>Donation</Link>
                        {/* <Link className="head-link" to='/mypage' onClick={this.list}>MyPage</Link> */}
                        <button className="head-link head-button" onClick={this.list}>MyPage</button>
                        <button className="head-link head-button" onClick={this.logout}>Logout</button>
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