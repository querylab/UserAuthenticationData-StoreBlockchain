import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Message, Icon } from 'semantic-ui-react';
import AuthenticationHash from '../utils/AuthenticationHash';
import "../App.css";

class SignUp extends Component {
    state = {
        username: '',
        password: '',
        digicode: '',
        alertMessage: '',
        status: '',
        signedUp: false,
        loading: false
    }

    onSignUp = async () => {
        if (this.state.username !== '' && this.state.password !== '' && this.state.digicode !== '') {
            let username = this.state.username.trim();
            let password = this.state.password.trim();
            let digicode = this.state.digicode.trim();

            if (password.length < 8) {
                this.setState({
                    alertMessage: "at least 8 characters for password",
                    status: 'failed',
                    password: '',
                    digicode: '',
                });
                return;
            } else if (digicode.length !== 6) {
                this.setState({
                    alertMessage: "6 digit required for digicode",
                    status: 'failed',
                    digicode: ''
                });
                return;
            } else {
                this.setState({ loading: true });

                let userAddress = await this.props.contract.methods.getUserAddress()
                    .call({ from: this.props.account });

                if (userAddress !== '0x0000000000000000000000000000000000000000') {
                    this.setState({
                        alertMessage: 'this account already exists',
                        status: 'failed',
                        username: '',
                        password: '',
                        digicode: '',
                        loading: false
                    });

                    return;
                } else {
                    let hash = await AuthenticationHash(username, this.props.account, password, digicode, this.props.web3);

                    await this.props.contract.methods.register(hash).send({ from: this.props.account });

                    this.setState({
                        username: '',
                        password: '',
                        digicode: '',
                        status: 'success',
                        alertMessage: "Signup successful",
                        signedUp: true,
                        loading: false
                    });

                    this.props.accountCreated(this.state.signedUp);
                    return;
                }
            }
        }
    }

    render() {
        return (
            <div className="sign-up">
                <div className='signup-form' style={{
                    display: "block",
                    margin: "0.5in auto 0",
                    background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                    border: "7px solid #fff",
                    borderRadius: "20px",
                    padding: "20px",
                    fontWeight: "bold",
                    marginTop: "-40px"
                }}>
                    <div
                        style={{
                            color: "white",
                            fontSize: "30px",
                            marginBottom: "10px",
                            fontWeight: "bold"
                        }}
                    >
                        Create Account
                    </div>
                    <Card fluid centered style={{
                        background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                        border: "0",
                        boxShadow: "none",
                    }}>
                        <Card.Content>
                            <Form size='large'>
                                {this.state.alertMessage !== '' && this.state.status === 'failed' ?
                                    <Message negative>
                                        {this.state.alertMessage}
                                    </Message> :
                                    this.state.alertMessage !== '' && this.state.status === 'success' ?
                                        <Message positive>
                                            {this.state.alertMessage}
                                        </Message> :
                                        console.log('')
                                }
                                <Form.Field>
                                    <input
                                        required
                                        type='text'
                                        placeholder='username'
                                        value={this.state.username}
                                        autoComplete="username"
                                        onChange={e => this.setState({ username: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        required
                                        type='password'
                                        placeholder='password'
                                        value={this.state.password}
                                        autoComplete="current-password"
                                        onChange={e => this.setState({ password: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <input
                                        required
                                        type='text'
                                        placeholder='6 digit code'
                                        value={this.state.digicode}
                                        autoComplete="digicode"
                                        onChange={e => this.setState({ digicode: e.target.value })}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Button
                                        type='submit'
                                        primary
                                        fluid
                                        size='large'
                                        onClick={this.onSignUp}
                                        style={{
                                            display: "flex",
                                            justifyContent: "center",
                                            marginLeft: "165px",
                                            alignItems: "center",
                                            background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                                            width: "150px",
                                            height: "40px",
                                            border: "7px solid #fff",
                                            borderRadius: "20px",
                                            padding: "10px 20px",
                                            fontWeight: "bold",
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                                        }}
                                    >
                                        {this.state.loading ?
                                            <Icon name='spinner' loading />
                                            : 'Register'}
                                    </Button>
                                </Form.Field>
                            </Form>
                        </Card.Content>
                    </Card>
                    <div className="signin-onUp" style={{
                        color: "white",
                        fontSize: "20px",
                        marginBottom: "10px",
                        fontWeight: "bold"
                    }}>
                        Already have an account? <Link to='/log-in' style={{ color: "#114c82" }}>Log in</Link>
                    </div>
                    
                </div>

                <footer   style={{
                      
                      padding: "20px",
                      fontWeight: "bold",
                      marginTop: "715px",
                      fontSize: "20px"

                  }}>
                 <div>

                    <a href="https://github.com/querylab" target="_blank" rel="noopener noreferrer">

                      <img src="https://i.imgur.com/eCdxTzl.png" width="30" alt="GitHub" />

                        </a>

                        <p style={{ color: "#114c82" }}>Made with <span role="img" aria-label="purple heart">💜</span> by querylab</p>
                          </div>

              </footer>
            </div>
        );
    }
}

export default SignUp;