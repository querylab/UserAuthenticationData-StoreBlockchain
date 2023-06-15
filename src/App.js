import React, { Component } from "react";
import web3Connection from './web3Connection';
import Contract from './Contract';
import Formate from './utils/Formate';
import 'semantic-ui-css/semantic.min.css'
import { Menu, Divider } from "semantic-ui-react";
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from './components/Home';
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn"
import SignOut from "./components/SignOut";
import UserAccount from './components/UserAccount';
import "./App.css";

class App extends Component {
  state = {
    web3: null,
    account: null,
    contract: null,
    balance: null,
    activeItem: 'home',
    signedUp: false,
    loggedIn: false,
    username: ''
    //color: 'teal'
  };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name, color: 'teal' })

  componentDidMount = async () => {
    try {
      const web3 = await web3Connection();
      const contract = await Contract(web3);
      const accounts = await web3.eth.getAccounts();

      this.setState({ web3, contract, account: accounts[0] }, this.start);
    } catch (error) {
      alert(
        `Failed to load web3`,
      );
      console.error(error);
    }

    await this.getAccount();
  };

  start = async () => {
    await this.getAccount();
    const { web3, contract, account } = this.state;

    console.log("web3 =", web3);
    console.log("Contract =", contract);
    console.log("Acoount =", account);
  };

  getAccount = async () => {
    if (this.state.web3 !== null || this.state.web3 !== undefined) {
      await window.ethereum.on('accountsChanged', async (accounts) => {
        this.setState({
          account: accounts[0],
          loggedIn: false
        });

        this.state.web3.eth.getBalance(accounts[0], (err, balance) => {
          if (!err) {
            this.setState({ balance: Formate(this.state.web3.utils.fromWei(balance, 'ether')) });
          }
        });
      });
    }
  }

  accountCreated = async (signedUp) => {
    this.setState({ signedUp });
  }

  userSignedIn = async (loggedIn, username) => {
    this.setState({ loggedIn, username });
  }

  loggedOut = async (loggedIn) => {
    this.setState({ loggedIn });
  }

  render() {
    const { activeItem, color } = this.state;

    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <div className="main-page">
          <BrowserRouter>
            <div className="home-nav">
              <Menu stackable inverted secondary size='large'        style={{
                       
                       background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                    
                       border: "7px solid #fff",
                       borderRadius: "20px",
                       padding: "20px",
                       fontWeight: "bold",
                   }}
                                        >

                <Menu.Item
                  name='home'
                  active={activeItem === 'home'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/'
                  
                  style={{
                    background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                    border: "7px solid #fff",
                    borderRadius: "20px",
                    padding: "20px",
                    fontWeight: "bold",
                 
                    
                    
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                }}
              />
                
                <Menu.Item
                  name='about'
                  color={color}
                  active={activeItem === 'about'}
                  onClick={this.handleItemClick}
                  as={Link}
                  to='/about'

                  style={{
                    background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                    border: "7px solid #fff",
                    borderRadius: "20px",
                    padding: "20px",
                    fontWeight: "bold",
                }}
                onMouseEnter={(e) => {
                    e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                }}
                />
                
                {
                  this.state.loggedIn ?
                    <Menu.Item
                      position='right'
                      name='user account'
                      color={color}
                      active={activeItem === 'user account'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/user-account'
                      style={{
                        background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                        border: "7px solid #fff",
                        borderRadius: "20px",
                        padding: "20px",
                        fontWeight: "bold",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                    }}

                    />
                    :
                    console.log('')
                }
                {
                  !this.state.loggedIn ?
                    <Menu.Item
                      position='right'
                      name='Log in'
                      color={color}
                      active={activeItem === 'Log in'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/log-in'
                      style={{
                        background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                        border: "7px solid #fff",
                        borderRadius: "20px",
                        padding: "20px",
                        fontWeight: "bold",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                    }}
                    />
                    :
                    console.log('')
                }

                {
                  this.state.loggedIn ?
                    <Menu.Item
                      name='sign out'
                      color='red'
                      active={activeItem === 'sign out'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/sign-out'
                      style={{
                        background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                        border: "7px solid #fff",
                        borderRadius: "20px",
                        padding: "20px",
                        fontWeight: "bold",
                      
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                    }}
                    />
                    :
                    <Menu.Item
                      name='Register'
                      color={color}
                      active={activeItem === 'Register'}
                      onClick={this.handleItemClick}
                      as={Link}
                      to='/register'
                      style={{
                        background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                        border: "7px solid #fff",
                        borderRadius: "20px",
                        padding: "20px",
                        fontWeight: "bold",
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.background = "linear-gradient(to right, #48a0dc, #e6e6e6)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = "linear-gradient(to right, #e6e6e6, #48a0dc)";
                    }}
                    />
                }
              </Menu>
            </div>
            <Divider inverted />

      

            <Switch>
              <Route exact path='/' >
                
                <Home />
                



                <footer   style={{
                      
                        padding: "20px",
                        fontWeight: "bold",
                        marginTop: "495px"
                    }}>
                   <div>

                      <a href="https://github.com/querylab" target="_blank" rel="noopener noreferrer">

                        <img src="https://i.imgur.com/eCdxTzl.png" width="30" alt="GitHub" />

                          </a>

                          <p style={{ color: "#114c82" }}>Made with <span role="img" aria-label="purple heart">💜</span> by querylab</p>

                            </div>

                </footer>





              </Route>
              <Route path='/about' >
  <div style={{ textAlign: 'center',    display: "block",
                            margin: "0.5in auto 0",
                            background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                         
                            border: "7px solid #fff",
                            borderRadius: "20px",
                            padding: "20px",
                            fontWeight: "bold"}}  >
    <h1 style={{ color: "#114c82" }}>User Authentication Store Data in Smart Contract</h1>
    <p style={{ color: "#114c82" }}>
      This project utilizes a combination of technologies including Solidity, Truffle, and ReactJS to provide a secure and decentralized user authentication solution.
    </p>
    <p style={{ color: "#114c82" }}>
      Solidity is the programming language used for developing smart contracts on the blockchain, while Truffle is a framework that simplifies the development and implementation of these contracts. ReactJS, on the other hand, is a widely-used JavaScript framework for building interactive user interfaces.
    </p>
    <p style={{ color: "#114c82" }}>
      The integration of ReactJS in this project allows for the creation of an intuitive and user-friendly interface. Users can input their login details and authenticate themselves using their Metamask wallet. Metamask acts as a browser extension that facilitates interaction with the blockchain and provides cryptographic signing of login data.
    </p>
    <p style={{ color: "#114c82" }}>
      During testing, the Sepolia test network was utilized as a common choice for development and testing within blockchain environments. However, it is important to note that this test network can be easily swapped out for other options depending on the project's requirements.
    </p>
    <p style={{ color: "#114c82" }}>
      To ensure secure authentication, it is essential for users to be connected to the blockchain before attempting to authenticate. This is accomplished through the use of the web3 sign method, which generates a cryptographic signature necessary for hashing the user's login data. By requiring blockchain connection, the system verifies the user's identity and ensures the authenticity of the login information before generating and storing the hash within the smart contract on the blockchain.
    </p>
    <p style={{ color: "#114c82" }}>
      In summary, this project offers a decentralized and secure user authentication solution through the combined use of Solidity, Truffle, ReactJS, and Metamask. ReactJS provides an intuitive user interface, while Solidity and Truffle enable the creation and deployment of smart contracts on the blockchain. Metamask allows for the secure cryptographic signing of login data, and connection to the blockchain is necessary to verify user identity and authenticate the login information.
    </p>
  </div>
  <footer   style={{
                      
                      padding: "20px",
                      fontWeight: "bold",
                      marginTop: "615px"
                  }}>
                 <div>

                    <a href="https://github.com/querylab" target="_blank" rel="noopener noreferrer">

                      <img src="https://i.imgur.com/eCdxTzl.png" width="30" alt="GitHub" />

                        </a>

                        <p style={{ color: "#114c82" }}>Made with <span role="img" aria-label="purple heart">💜</span> by querylab</p>

                          </div>

              </footer>
</Route>
              {
                this.state.loggedIn ?
                  <Route path='/user-account' >
                    <UserAccount
                      account={this.state.account}
                      username={this.state.username}
                    />
                  </Route>
                  :
                  <Route path='/user-account'>
                    You have been logged out
                  </Route>
              }
              {
                <Route path='/log-in' >
                  {
                    this.state.loggedIn ?
                      <Redirect to='/user-account' />
                      :
                      <SignIn
                        web3={this.state.web3}
                        contract={this.state.contract}
                        account={this.state.account}
                        signedUp={this.state.signedUp}
                        userSignedIn={this.userSignedIn}
                      />
                  }
                </Route>
              }

              {
                this.state.loggedIn ?
                  <Route path='/sign-out'>
                    <SignOut
                      loggedOut={this.loggedOut}
                    />
                    You've been logged out
                    <br></br>
                    Thank you
                  </Route>
                  :
                  <Route path='/register' >
                    <SignUp
                      web3={this.state.web3}
                      contract={this.state.contract}
                      account={this.state.account}
                      accountCreated={this.accountCreated}
                    />
                  </Route>
              }
            </Switch>
          </BrowserRouter>
        </div>
        
      </div>

      
    );
  }
}

export default App;
