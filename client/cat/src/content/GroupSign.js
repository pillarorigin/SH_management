import React, { Component } from 'react';
import axios from 'axios';

export default class GroupSign extends Component {
    state={
        name:'',
        userid:'',
        password:''
      
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
     }
     handleClick = () =>{
         alert("name : "+this.state.name+ " userid : "+this.state.userid+" password : "+this.state.password)
         console.log("click",this.state)
         axios.post('http://localhost:4000/users',{
             name: this.state.name,
             userId: this. state.userid,
             password: this.state.password
         })
         .then ((response)=>{
             console.log("요청함",response);
             if(response.data.result === "fail"){
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
            <div>
                <h1>그룹 회원가입</h1>
            <form >
            <input placeholder="name"
            value ={this.state.name}
            onChange={this.handleChange}
            name = 'name'
            />
            <input placeholder="userid"
            value = {this.state.userid}
            onChange={this.handleChange}
            name = 'userid'
            />
            <input placeholder="password"
            passwvalueord = {this.state.password}
            onChange={this.handleChange}
            name = 'password'
            />
            
            <div>{this.state.name}</div>
            <div>{this.state.userid}</div>
            <div>{this.state.password}</div>
        </form>
        <button onClick = {this.handleClick}>
                Click
            </button>
            </div>
        )
    }
}