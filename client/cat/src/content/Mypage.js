import React, { Component } from 'react';
import Axios from 'axios';

export default class Mypage extends Component {
    constructor(props) {
        super(props)
        Axios.get(`http://localhost:4000/ContractConnector?group=${JSON.parse(localStorage.getItem('data')).name}`, {

        }).then(function (res) {
            let result = JSON.parse(res);
            console.log("result = ", result);
            
        }).catch(function(error){
            console.log(error)
        })
    }

    render() {
        console.log(JSON.parse(localStorage.getItem('data')).name)
        console.log(`http://localhost:4000/ContractConnector?group=${JSON.parse(localStorage.getItem('data')).name}`)
        
        const name = JSON.parse(localStorage.getItem('name'));
        const userid = JSON.parse(localStorage.getItem('userid'));
       

        return (
            <div>
                <div>
                    <h1>환영합니다 {name}{userid}</h1>
                </div>
                <div>
                    {}
                </div>
            </div>
        )
    }
}
