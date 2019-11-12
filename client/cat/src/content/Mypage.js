import React, { Component } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Container, Row, Col } from 'react-grid-system';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import './Mypage.css';

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

        /*
  <Container fluid style={{ lineHeight: '32px' }}>
  <Row debug>
    <Col debug>Logo (Flexible column)</Col>
    <Col xs="content" debug> Menu with x-items</Col>
  </Row>
</Container>
        */
        return (
            <div>
                <Container>
                    <Row>
                        <Col xs={4}>
                            <Card>
                                <CardBody>
                                    <CardTitle>
                                        <div>
                                            <h3>환영합니다</h3>
                                        </div>
                                    </CardTitle>
                                    <CardSubtitle>
                                        <div>
                                            {name}님
                                            </div>
                                    </CardSubtitle>
                                    <CardText>
                                    동물이 인간의 일방적인 착취와 이용에서 벗어나 존엄한 생명으로서 그들 본연의 삶을 영위하고, 모든 생명이 균형과 조화 속에 공존하는 세상을 지향한다.
                                    </CardText>
                                    <img className="MyImg" src={img_path}></img>
                                </CardBody>
                            </Card>
                        </Col>


                        <Col>
                            <Table hover>
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
                            <Button className="btn-position"><Link to='/transaction' className="donation">후원등록</Link></Button>
                            
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
export default Mypage;