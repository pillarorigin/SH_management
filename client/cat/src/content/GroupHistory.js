
import React, { Component } from 'react'
import Table from 'react-bootstrap/Table'
import Axios from 'axios'
//import History from '../../build/contracts/History.json'

export default class Transaction extends Component {


    render() {
        return (
            <div>
                <h1>Group Transaction History</h1>

                <Table striped bordered hover>
                    {/* name, groupName, accountNumber, accounts, useHistory, date */}
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>동아리명</th>
                            <th>계좌번호</th>
                            <th>금액</th>
                            <th>사용내역</th>
                            <th>날짜</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                            <td>{}</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        )
    }
}
