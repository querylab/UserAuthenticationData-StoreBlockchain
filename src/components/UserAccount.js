import React, { Component } from 'react';
import { Card, Grid, Message, Image } from 'semantic-ui-react';
import '../App.css';

class UserAccount extends Component {
    render() {
        return (
            <div className='user-account'>
                <Grid centered stackable>
                    <Grid.Row>
                        <Grid.Column>
                            <Card fluid style={{
                    display: "block",
                    margin: "0.5in auto 0",
                    background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                    border: "7px solid #fff",
                    borderRadius: "20px",
                    padding: "20px",
                    fontWeight: "bold",
                    marginTop: "-40px"
                }}>
                                <Image
                                    src='https://i.imgur.com/1ds7YSH.png'
                                    wrapped
                                    ui={false}
                                />
                                <Card.Content>
                                    <Card.Header style={{ color: "#114c82" }}>{this.props.username}</Card.Header>
                                    <Card.Meta>
                                        <span>Username</span>
                                    </Card.Meta>
                                    <Card.Description style={{ color: "#114c82" }}>
                                        <strong style={{ color: "#114c82" }}>
                                            {
                                                this.props.username.charAt(0).toUpperCase() +
                                                this.props.username.toLowerCase().slice(1)
                                            }
                                        </strong> is a Computer Engineering and Security Research.
                                        <br />
                                        <Image
                                            src='https://i.imgur.com/eCdxTzl.png'
                                            as='a'
                                            href='https://github.com/querylab'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            size='mini'
                                            
                                        />
                                           <Image
                                            src='https://i.imgur.com/tsyK7WI.png'
                                            as='a'
                                            href='https://twitter.com/querylab_'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            size='mini'
                                            
                                        />
                                           <Image
                                            src='https://i.imgur.com/CgewnwO.png'
                                            as='a'
                                            href='https://medium.com/@querylab'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            size='mini'
                                            
                                        />
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    <Message size='medium' style={{
                       
                       background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                     color: "#114c82",
                       border: "7px solid #fff",
                       borderRadius: "20px",
                       padding: "20px",
                       fontWeight: "bold",
                   }}>
                                    My Wallet Address:  {this.props.account.toLowerCase()}
                                    </Message>
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
            </div>
            
        );
        
    }
    
}

export default UserAccount;