import React, { Component } from 'react';
import axios from 'axios';

class GroupSign extends Component {
    constructor(props) {
        super(props);
        this.state ={
            name:'',
            userid:'',
            password:'',
            slogan:'',
            detail:'',
            accountNumber:'',    
            images:null
        }
    }

    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        })
     }
     imageUpload = (e)=>{
         console.log(e.target.files[0])
        this.setState({
            images : e.target.files[0]
        })
     }
     handleClick = () =>{
        let data =new FormData()
        data.append('name',this.state.name);
        data.append('password',this.state.password);
        data.append('userId',this.state.name);
        data.append('images', this.state.images);
        data.append('slogan',this.state.slogan);
        data.append('detail', this.state.detail);
        data.append('accountNumber', this.state.accountNumber)
        console.log("data",data)
        const config = {
            header :{
                'Content-Type' : 'multipart/form-data'
            }
        }        
         axios.post('http://localhost:4000/users/register', data , config)
         .then ((response)=>{
             console.log("요청함",response.statusText);
             if(response.data.result === "fail"){
                console.log(response);
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

            <input placeholder="slogan"
            passwvalueord = {this.state.slogan}
            onChange={this.handleChange}
            name = 'slogan'
            />
            <input placeholder="detail"
            passwvalueord = {this.state.detail}
            onChange={this.handleChange}
            name = 'detail'
            />
            <input placeholder="accountNumber"
            passwvalueord = {this.state.accountNumber}
            onChange={this.handleChange}
            name = 'accountNumber'
            />
            <input type='file'
            ref= {this.fileInput}
            onChange={this.imageUpload}
            name='images'/>

            
           
            
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

export default GroupSign;