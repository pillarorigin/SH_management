import React, { Component } from 'react'
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

class Promotion extends Component {
    state = {
        promotionDiv: []
    }
    componentDidMount() {
        Axios.get(`http://localhost:4000/promotion/read/1`)
            .then(rawData => {
                let promotionData = rawData.data.result[0];
                console.log(promotionData);

                let promotionDiv= [];

                promotionDiv.push(
                    <div>
                        <h1>{promotionData.title}</h1>
                        <img src={promotionData.imgPath} alt="img"></img>
                        <p>작성자: {promotionData.writer}</p>
                        <p>동아리: {promotionData.group_name}</p>
                        <div>
                            {promotionData.content}
                        </div>
                        <p>후원계좌: {promotionData.account_number}</p>
                        <p>작성시간: {promotionData.date}</p>
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