import React, { Component } from 'react';
import NormalSign from './NormalSign';
import GroupSign from './GroupSign';
import './Sign.css';

export default class Sign extends Component {
    state={
        isLoggedIn:''
    }
    NormalSign = ()=>{
       if(this.normal.value ==="normal"){
        // console.log(this.normal.value)
         this.setState({
            isLoggedIn:'normal'
         });
       }
      
    }
    GroupSign = () =>{
        if(this.group.value ==="group"){
            // console.log(this.group.value)
            this.setState({
                isLoggedIn:'group'
            });
        }
        // console.log(this.state)
    }
    render() {
        
        const isLoggedIn = this.state.isLoggedIn;

        let page = null;
        if (isLoggedIn ==="normal") {
          page= <NormalSign  />
          document.getElementById('normal').style.display = "none";
          document.getElementById('group').innerText = "그룹 회원 가입";
          document.getElementById('group').style.display = "inline-block";
        }
        if(isLoggedIn==="group") {
          page=<GroupSign />
          document.getElementById('normal').innerText = "일반 회원 가입";
          document.getElementById('group').style.display = "none";
          document.getElementById('normal').style.display = "inline-block";

        }
        return (
            <div>
                <h1>회원가입</h1>
                <button id="normal" onClick={this.NormalSign} ref={ref=>this.normal=ref} value='normal'>일반</button>
                <button id="group" onClick={this.GroupSign} ref={ref=>this.group=ref} value='group'>그룹</button>
    
                {page}
                
            </div>
        )
    }
}

// 10/24 현재  에러남 그거 고쳐야함