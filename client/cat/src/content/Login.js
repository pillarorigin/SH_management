import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: '',
            login:'false'

        }
    }
    // state = {
    //     userId: '',
    //     password: '',
    //     loginOk: ''
    // }

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



    render() {
        

        return (
           
            <div>
                <h1>Login</h1>
                <form>
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
                <button type="button" onClick={this.login}>로그인</button>
                <button><Link to='/sign'>회원가입</Link></button>
            </div>
        )
    }
}
export default withRouter(Login);