import React, {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Auth from '../Middleware/Auth'
import '../Style/Welcome.css'

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorEmail: '',
            errorPassword: '',
            alert: ''
        }
    }

    handleEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handlePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    checkLoginAttempt = () => {
        if (this.state.errorEmail.length == 0 && this.state.errorPassword.length == 0) {
            console.log("login sequence");

            var obj = {email: this.state.email, password: this.state.password};
            Auth.login(obj, (result) => {
                if (result === "success") {
                    this.props.history.push({
                        pathname: '/home',
                        state: {email: this.state.email}
                    });
                } else {
                    this.setState({
                        alert: "alert"
                    })
                }
            })

            
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var errorEmail = "";
        var errorPassword = "";
        if (this.state.email.length == 0) {
            errorEmail = "Your email cannot be blank.";
        }
        if (this.state.password.length == 0) {
            errorPassword = "Your password cannot be blank.";
        }

        this.setState({errorEmail: errorEmail, errorPassword: errorPassword}, () => {
            this.checkLoginAttempt();
        })
    }

    render() {
        let alert;
        if (this.state.alert === 'alert') {
            alert = <Alert variant="danger"> Wrong password. Please try again. </Alert>
        }

        return (
            <div>
                <div>
                 {alert}
                </div>
                <div class="container-welcome">
                    <Container fluid="sm">
                        <h1 class="penn-safety"> Safe Roads </h1>
                        <div class="card-container">
                            <div class="card">
                                <h5 class="sign-in"> Please sign in</h5>
                                <Form onSubmit = {this.handleSubmit}>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" onChange = {this.handleEmail}/>
                                    <Form.Text className="red-text">
                                        {this.state.errorEmail}
                                    </Form.Text>    
                                </Form.Group>
                                <Form.Group controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" onChange = {this.handlePassword}/>
                                    <Form.Text className="red-text">
                                        {this.state.errorPassword}
                                    </Form.Text>    
                                </Form.Group>
                                <div class="button">
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                </div>
                                
                                </Form>
                            </div>
                        </div>
                        
                        <div class="sign-up-container">
                            <h5 class="sign-up"> Don't have an account? Sign up today! </h5>
                            <Link to="/signup" className="btn btn-light"> Sign up </Link>
                        </div>
                        
                    </Container>
                </div>
            </div>
            
        )
                

    }
}

export default Welcome;