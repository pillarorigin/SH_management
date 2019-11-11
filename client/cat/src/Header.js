import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Header.css';
import Axios from 'axios';
import { Button , ButtonGroup, Breadcrumb} from 'reactstrap';
class Header extends Component {
    logout = () => {
        localStorage.removeItem('userId');
        this.props.loginState();
        this.props.history.push('/');
    }
    list = () => {
        const name = JSON.parse(localStorage.getItem('userId'));
        const url = `http://localhost:4000/users/${name}`;
        const data = {
            userId: name
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        Axios.get(url, data, config)
            .then((response) => {
                console.log('res', response)
                localStorage.setItem('data', JSON.stringify(response.data.result[0]))
                console.log(localStorage)
                this.props.history.push('/mypage')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    menuset = () => {
        if (localStorage.getItem('userId')) {
            return (
                <div>
                    <div className="head-div">
                        <ButtonGroup>
                    <Button outline color="secondary"><Link style={{color:"black"}} to='/'>Home</Link></Button>
                    <Button outline color="secondary"><Link style={{color:"black"}} to='/info'>Info</Link></Button>
                    <Button outline color="secondary"><Link style={{color:"black"}} to='/donation'>Donation</Link></Button>
                        {/* <Link className="head-link" to='/mypage' onClick={this.list}>MyPage</Link> */}
                        <Button onClick={this.list}>MyPage</Button>
                        <Button onClick={this.logout}>Logout</Button>
                        </ButtonGroup>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="head-div">
                    <ButtonGroup>
                        <Button outline color="secondary"> <Link style={{color:'black'}} to='/'>Home</Link> </Button>
                        <Button outline color="secondary"> <Link style={{color:'black'}} to='/info'>Info</Link></Button>
                        <Button outline color="secondary"> <Link style={{color:'black'}} to='/donation'>Donation</Link></Button>
                        <Button outline color="secondary"> <Link style={{color:'black'}} to='/login'>Login</Link></Button>
                        <Button outline color="secondary"> <Link style={{color:'black'}} to='/sign'>Sign</Link></Button>
                        </ButtonGroup>
                    </div>
                </div>
            )
        }
    }

    render() {
        var menu = this.menuset()
        return (
            <div>
                {menu}
                <h1 align="center" style ={{fontFamily: 'Sunflower', fontSize:'80px'}}> 길냥이 이야기</h1>
            </div>
        )
    }
}
export default withRouter(Header)