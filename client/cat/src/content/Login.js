import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

export default class Login extends Component {
    login = ()=>{
        axios
    }

    render() {
        return (
            <div>
                <h1>Login</h1>
                <form>
                    <input placeholder="아이디" type="text"/>
                    <input placeholder="비밀번호" type="password" />
                    <button onClilck={login}>로그인</button>
                    <button><Link to ='/sign'>회원가입</Link></button>
                </form>
            </div>
        )
    }
}
