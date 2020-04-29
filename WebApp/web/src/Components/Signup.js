import React, {Component} from 'react'
import {Redirect, Link, withRouter} from 'react-router-dom'
import options from '../Components/SearchShow/options'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Auth from '../Middleware/Auth'
import '../Style/Signup.css'

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            lastname: '',
            email: '',
            errorEmail: '',
            password: '',
            errorPassword: '',
            favcity: '',
            alert: ''
        }
    }

    handleFirstname = (event) => {
        this.setState({
            firstname: event.target.value
        })
        console.log(options);
    }

    handleLastname = (event) => {
        this.setState({
            lastname: event.target.value
        })
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

    handleCities = (event) => {
        this.setState({
            favcity: event.target.value
        })
    }

    checkSignupAttempt() {
        if (this.state.errorEmail.length == 0 && this.state.errorPassword.length == 0) {
            console.log("signup sequence");

            var objCheckLogin = {email: this.state.email, password: this.state.password};
            var objSignup = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password, username: this.state.username, university: this.state.university};
            
            Auth.signup(objSignup, (result) => {
                if (result === "user exists") {
                    this.setState({
                        alert: "Email already exists or incorrect password!"
                    })
                } else if (result === "success") {
                    this.props.history.push({
                        pathname: '/home',
                        state: {email: this.state.email}
                    });
                } else {
                    this.setState({
                        alert: "Error with saving user data"
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
            this.checkSignupAttempt();
        })
    }

    render() {
        console.log(options);
        let alert;
        if (this.state.alert.length != 0) {
            alert = <Alert variant="danger"> {this.state.alert} </Alert>;
        }

        return (
            <div>
                <div>
                {alert}
                </div>
                <div class="container-signup">
                    <Container fluid="lg">
                        <h1 class="sign-in"> Sign Up</h1>
                        <div class="card-container">
                            <div class="card">
                                <Form onSubmit = {this.handleSubmit}>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="firstname" placeholder="First name" onChange = {this.handleFirstname}/>
                                    </Form.Group>
                                    <Form.Group controlId="formLastName">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="lastname" placeholder="Last name" onChange = {this.handleLastname}/>
                                    </Form.Group>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange = {this.handleEmail}/>
                                        <Form.Text className="red-text">
                                            {this.state.errorEmail}
                                        </Form.Text>    
                                    </Form.Group>
                                    <Form.Group controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Enter password" onChange = {this.handlePassword}/>
                                        <Form.Text className="red-text">
                                            {this.state.errorPassword}
                                        </Form.Text>    
                                    </Form.Group>
                                    <Form.Group controlId="exampleForm.ControlSelect1">
                                        <Form.Label>Favorite City</Form.Label>
                                        <Form.Control as="select" onChange={(e) => this.handleCities(e)}>
                                            {options && options.map((e, key) => {
                                                return <option key = {key} value={e.value}> {e.value} </option>
                                            })}
                                        </Form.Control>
                                    </Form.Group>
                                    <div class="button">
                                        <Button variant="primary" type="submit">
                                            Sign Up
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            
        )
    }

}


export default Signup;