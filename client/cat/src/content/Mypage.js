import React,{Component} from 'react';

export default class Mypage extends Component{
    render(){
        const name = JSON.parse(localStorage.getItem('userId'))
        return(
            
            <div>
                <h1>환영합니다 {name}</h1>
            </div>
        )
    }
}