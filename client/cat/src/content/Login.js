import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios';
import './Login.css'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            login: 'false'

        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    login = () => {
        console.log("클릭")
        const url = 'http://localhost:4000/users/login';
        const data = {
            userId: this.state.userId,
            password: this.state.password
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        Axios.post(url, data, config)
            .then((response) => {
                console.log("요청함", response);
                if (response.data.result === "NoId") {
                    return (
                        alert("아이디가 존재하지 않습니다")
                    )
                } else if (response.data.result === "NoPw") {
                    return (
                        alert("비밀번호가 틀렸습니다")
                    )
                } else if (response.data.result === "success") {
                    console.log(response.data.session)
                    localStorage.setItem('userId', JSON.stringify(response.data.session));
                    // var loginData = {
                    //     LoggedIn: true,
                    //     uername : JSON.stringify(response.data.session)
                    // }
                    // sessionStorage.setItem('key',JSON.stringify(loginData));
                    this.props.loginState()

                    // window.location.reload(false)
                    this.props.history.push('/');
                    // window.location.href = '/';
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }
    test = () => {
        const name = JSON.parse(localStorage.getItem('userId'));
        console.log(name)
        const url = `http://localhost:4000/users/${name}`;
        const data = {
            userId: this.state.userId,
            password: this.state.password
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        Axios.post(url, data, config)
            .then((response) => {
                console.log("요청함", Axios.url);
                if (response.data.result === "NoId") {
                    return (
                        alert("아이디가 존재하지 않습니다")
                    )
                } else if (response.data.result === "NoPw") {
                    return (
                        alert("비밀번호가 틀렸습니다")
                    )
                } else if (response.data.result === "success") {
                    console.log(response.data.session)
                    localStorage.setItem('userId', JSON.stringify(response.data.session));
                    // var loginData = {
                    //     LoggedIn: true,
                    //     uername : JSON.stringify(response.data.session)
                    // }
                    // sessionStorage.setItem('key',JSON.stringify(loginData));
                    this.props.loginState()
                    this.props.history.push('/');

                }

            })
            .catch((error) => {
                console.log(error)
            })

    }


    render() {

        if (!localStorage.getItem('userId')) {
            return (
                <div className="loginpage">
                    <div className='login'>
                        <h1>로그인</h1>
                        <form id='form-style'>
                            <input
                                placeholder="아이디"
                                type="text"
                                value={this.state.name}
                                onChange={this.handleChange}
                                name="userId" />
                            <input
                                placeholder="비밀번호"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                name="password" />

                        </form>
                        <button className="form-button left" type="button" onClick={this.login}>로그인</button>
                        <button className="form-button right"><Link to='/sign' id="Link">회원가입</Link></button>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>잘못된 접근입니다</h1>
                </div>
            )
        }
    }
}
export default withRouter(Login);