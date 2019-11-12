import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';
import {Link} from 'react-router-dom'
class Mypage extends Component {
    state = {
        contractList: []
    }
    componentDidMount() {
        Axios.get(`http://localhost:4000/ContractConnector?group=${JSON.parse(localStorage.getItem('data')).name}`)
            .then(rawData => {

                let contract_elements = rawData.data.result;
                let contractList = [];
                let index = 1;
                contract_elements.forEach(el => {
                    contractList.push(
                        <tr key={index}>
                            <td>{index}</td>
                            <td>{el.name}</td>
                            <td>{el.group}</td>
                            <td>{el.accountNum}</td>
                            <td>{el.accounts}</td>
                            <td>{el.history}</td>
                            <td>{el.date}</td>
                        </tr>
                    )
                    index++;
                });
                this.setState({
                    contractList: contractList
                })
                console.log(contract_elements);
            }).catch(function (error) {
                console.log("err다!!!!!")
                console.error(error)
            })
    }
    render() {
        // console.log(JSON.parse(localStorage.getItem('data')).name)
        // console.log(`http://localhost:4000/ContractConnector?group=${JSON.parse(localStorage.getItem('data')).name}`)

        const data = JSON.parse(localStorage.getItem('data'));
        const name = data.name;
        const img_path = data.img_path;

        return (
            <div>
                <div>
                    <h1>환영합니다 {name}</h1>
                    <img src={img_path}></img>
                    <Link to='/transaction'>후원등록</Link>
                </div>
                <div>
                    <Table striped>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>후원자명</th>
                                <th>동아리명</th>
                                <th>계좌번호</th>
                                <th>금액</th>
                                <th>사용내역</th>
                                <th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.contractList}
                        </tbody>
                    </Table>
                    
                </div>
            </div>
        )
    }
}
export default Mypage;