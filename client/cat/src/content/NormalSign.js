import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import axios from 'axios';
import './NormalSign.css'

 class NormalSign extends Component {
    constructor(props){
        super(props);
        this.state={
            
        name:'',
        userid:'',
        password:''
      

        }
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
     }
     handleClick = () =>{
         console.log("click",this.state)
         axios.post('http://localhost:4000/users',{
             name: this.state.name,
             userId: this. state.userid,
             password: this.state.password
         })
         .then ((response)=>{
             console.log("요청함",response);
             if(response.data.result =='success'){
                this.props.history.push('/Login');
             } else if(response.data.result == "fail"){
                 return(
                     alert("실패하였습니다")
                 )
             }
         })
         .catch((error)=>{
             console.log(error);
         })
     }

    render() {
        

        return (
            <div className='Normal-login'>
            <div className='Normal-div'>
                <h1>일반 회원가입</h1>
            <form id='Normal-form'>
            
            <input placeholder="이름"
            value ={this.state.name}
            onChange={this.handleChange}
            name = 'name'
            />
            <input placeholder="아이디"
            value = {this.state.userid}
            onChange={this.handleChange}
            name = 'userid'
            />
            <input placeholder="비밀번호"
            passwvalueord = {this.state.password}
            onChange={this.handleChange}
            name = 'password'
            />
        </form>
        <button onClick = {this.handleClick}>
                회원가입
            </button>
            </div>
            </div>
        )
    }
}
export default withRouter(NormalSign);