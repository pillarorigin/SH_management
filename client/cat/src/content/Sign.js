import React, { Component } from 'react'

export default class Sign extends Component {
    state={
        name:'',
        email:'',
        password:''
    }
    handleChange = (e) => {
       this.setState({
         [e.target.name]: e.target.value
       })
    }
    handleClick = () =>{
        console.log("click",this.state)
        
    }
    render() {
        return (
            
            <div>
                <h1>회원가입</h1>
                <form >
                    <input placeholder="name"
                    value ={this.state.name}
                    onChange={this.handleChange}
                    name = 'name'
                    />
                    <input placeholder="email"
                    value = {this.state.email}
                    onChange={this.handleChange}
                    name = 'email'
                    />
                    <input placeholder="password"
                    passwvalueord = {this.state.password}
                    onChange={this.handleChange}
                    name = 'password'
                    />
                    
                    <div>{this.state.name}</div>
                    <div>{this.state.email}</div>
                    <div>{this.state.password}</div>
                </form>
                <button onClick = {this.handleClick}>
                        Click
                    </button>
            </div>
        )
    }
}
