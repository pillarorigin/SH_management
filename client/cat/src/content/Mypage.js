import React,{Component} from 'react';
import Axios from 'axios';

export default class Mypage extends Component{
    constructor(){
        Axios.get(`http://localhost:4000/ContractConnector/${localStorage.getItem('name')}`)
            .then(function(res){
                let result = res
                let nameArray = result.name;
                let groupArray = result.group;
                let accountNumArray = result.accountNum;
                let accountsArray = result.accounts;
                let historyArray = result.history;
                let dateArray = result.dateArray;    
            })
            .catch((error)=>{
                console.log(error)
            })
        
    }
    
    render(){
        const name = JSON.parse(localStorage.getItem('userId'));
        const data = JSON.parse(localStorage.getItem('data'));
        console.log("mymymymymynononono",data)
        const slogan = data.slogan

        return(
            
            <div>
                <div>
                    <h1>환영합니다 {name}{slogan}</h1>  
                </div>
                <div>
                    {}
                </div>
            </div>
        )
    }
}