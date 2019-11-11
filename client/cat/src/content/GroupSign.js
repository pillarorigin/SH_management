import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import './GroupSign.css';

class GroupSign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            userid: '',
            password: '',
            slogan: '',
            detail: '',
            accountNumber: '',
            images: null
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    imageUpload = (e) => {
        console.log(e.target.files[0])
        this.setState({
            images: e.target.files[0]
        })
    }
    handleClick = () => {
        let data = new FormData()
        data.append('name', this.state.name);
        data.append('password', this.state.password);
        data.append('userId', this.state.userid);
        data.append('images', this.state.images);
        data.append('slogan', this.state.slogan);
        data.append('detail', this.state.detail);
        data.append('accountNumber', this.state.accountNumber);
        for (let e of data.entries()) {
            console.log(`key : ${e[0]}, value : ${e[1]}`)
        }
        const config = {
            header: {
                'Content-Type': 'multipart/form-data'
            }
        }
        axios.post('http://localhost:4000/users/register', data, config)
            .then((response) => {
                console.log("요청함", response);
                if (response.data.result == "fail") {
                    console.log(response);
                    return (
                        alert("실패하였습니다")
                    )
                }else{
                    this.props.history.push('/Login')
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    render() {


        return (
            <div className="Group-sign">
                <div className="Group-form">
                    <h1>그룹 회원가입</h1>
                    <form >
                        <input placeholder="이름"
                            value={this.state.name}
                            onChange={this.handleChange}
                            name='name'
                        />
                        <input placeholder="아이디"
                            value={this.state.userid}
                            onChange={this.handleChange}
                            name='userid'
                        />
                        <input placeholder="비밀번호"
                            value={this.state.password}
                            onChange={this.handleChange}
                            name='password'
                        />

                        <input placeholder="슬로건"
                            value={this.state.slogan}
                            onChange={this.handleChange}
                            name='slogan'
                        />
                        <input placeholder="소개"
                            value={this.state.detail}
                            onChange={this.handleChange}
                            name='detail'
                        />
                        <input placeholder="계좌번호"
                            value={this.state.accountNumber}
                            onChange={this.handleChange}
                            name='accountNumber'
                        />
                        <input type='file'
                            ref={this.fileInput}
                            onChange={this.imageUpload}
                            name='images' />
                    </form>
                    <button onClick={this.handleClick}>
                        회원가입
                    </button>
                </div>
            </div>
        )
    }
}

export default withRouter (GroupSign);