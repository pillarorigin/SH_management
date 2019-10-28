import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component {
    state = {
        userId: '',
        password: ''
    }
    handleChange=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        })

    }
    login = () => {
        axios.post('http://localhost:4000/users/login', {
            userId: this.state.userId,
            password: this.state.password
        })
        .then((response)=>{
            console.log("요청함",response);
             if(response.data.result === "fail"){
                 return(
                     alert("실패하였습니다")
                 )
             }
        })
        .catch((error)=>{
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
                    name="password"
                     />
                </form>

                <button onClick={this.login}>로그인</button>
                <button><Link to='/sign'>회원가입</Link></button>
            </div>
        )
    }
}
