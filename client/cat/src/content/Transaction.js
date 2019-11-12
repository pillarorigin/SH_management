import React, { Component } from 'react';
import Axios from 'axios';
import './Transaction.css';
//import History from '../../build/contracts/History.json'

export default class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            groupName: '',
            accountNumber: '',
            accounts: '',
            useHistory: '',
            date: ''
        }
    }
 
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    TxTransfer = () => {
        Axios.post('http://localhost:4000/ContractConnector/transfer', {
            name: this.state.name,
            groupName: this.state.groupName,
            accountNumber: this.state.accountNumber,
            accounts: this.state.accounts,
            useHistory: this.state.useHistory,
            date: new Date
        })
            .then(
                (c) => { console.log(c) }
            )
            .catch(
                (error) => { console.log(error) }
            )
    }
    render() {
        return (
            <div>
                
                <form className="Tran-form">
                <h1>등록하기</h1>
                    <input placeholder="이름" className="Tran-input" type="text" value={this.state.name} onChange={this.handleChange} name='name' />
                    <input placeholder="동아리명" className="Tran-input" type="text" value={this.state.groupName} onChange={this.handleChange} name='groupName' />
                    <input placeholder="계좌번호" className="Tran-input" type="text" value={this.state.accountNumber} onChange={this.handleChange} name='accountNumber' />
                    <input placeholder="금액" className="Tran-input" type="text" value={this.state.accounts} onChange={this.handleChange} name='accounts' />
                    <input placeholder="사용내역" className="Tran-input" type="text" value={this.state.useHistory} onChange={this.handleChange} name='useHistory' />
                    <input placeholder="날짜" className="Tran-input" type="date" value={this.state.date} onChange={this.handleChange} name='date' />
                    <button type="button" onClick={this.TxTransfer}>등록</button>
                </form>
                
                
            </div>
        )
    }
}
