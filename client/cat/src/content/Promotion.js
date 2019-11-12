import React, { Component } from 'react'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {
    Card, CardImg, CardText, CardBody, CardLink,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
import './Promotion.css';

class Promotion extends Component {
    state = {
        promotionDiv: []
    }
    componentDidMount() {
        Axios.get(`http://localhost:4000/promotion/read/22`)
            .then(rawData => {
                let promotionData = rawData.data.result[0];
                console.log(promotionData);

                let promotionDiv = [];

                promotionDiv.push(
                    <div key={promotionData.board_idx}>
                        <Card className="CardMain">
                            <CardBody>
                                <CardTitle><h1 className="pro-h1">{promotionData.title}</h1><Button className="pro-btn">후원이력확인</Button></CardTitle>
                                
                                <CardSubtitle>{promotionData.group_name}</CardSubtitle>
                            </CardBody>
                            <CardBody>
                                <CardImg src={promotionData.imgPath} alt="img"></CardImg>
                                <div>
                                    {promotionData.content}
                                </div>
                                <p>후원계좌: {promotionData.account_number}</p>
                                <p>작성시간: {promotionData.date}</p>
                            </CardBody>
                        </Card>
                    </div>
                )
                this.setState({
                    promotionDiv: promotionDiv
                })
                console.log(promotionDiv);
            });

    }

    render() {


        return (
            <div>
                {this.state.promotionDiv}
            </div>
        )

    }
}

export default Promotion;