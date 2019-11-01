import React, { Component } from 'react'
import Axios from 'axios'
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
                (err) => { console.log(err) }
            )
            .catch(
                (error) => { console.log(error) }
            )
    }
    render() {
        return (
            <div>
                <h1>Transaction</h1>
                <form >
                    <p>이름</p>
                    <input type="text" value={this.state.name} onChange={this.handleChange} name='name' />
                    <p>동아리명</p>
                    <input type="text" value={this.state.groupName} onChange={this.handleChange} name='groupName' />
                    <p>계좌번호</p>
                    <input type="text" value={this.state.accountNumber} onChange={this.handleChange} name='accountNumber' />
                    <p>금액</p>
                    <input type="text" value={this.state.accounts} onChange={this.handleChange} name='accounts' />
                    <p>사용내역</p>
                    <input type="text" value={this.state.useHistory} onChange={this.handleChange} name='useHistory' />
                    <p>날짜</p>
                    <input type="date" value={this.state.date} onChange={this.handleChange} name='date' />
                </form>
                <button onClick={this.TxTransfer}>등록</button>
            </div>
        )
    }
}
