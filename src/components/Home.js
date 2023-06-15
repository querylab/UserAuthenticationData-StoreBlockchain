import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';
import img from '../img/database.png';
import '../App.css';

class Home extends Component {
    render() {
        return (
            <div className='home-page' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '-100vh' }}>
                <div>
                    <Image
                        src={img}
                        alt='image'
                        style={{
                            display: "block",
                            margin: "0 auto",
                            background: "linear-gradient(to right,#e6e6e6,#ffff)",
                            color: "#fff",
                            border: "10px solid #fff",
                            borderRadius: "40px",
                            padding: "30px",
                            fontWeight: "bold",
                        }}
                    />
                    <p
                        style={{
                            display: "block",
                            margin: "0.5in auto 0",
                            background: "linear-gradient(to right,#e6e6e6,#48a0dc)",
                         
                            border: "7px solid #fff",
                            borderRadius: "20px",
                            padding: "20px",
                            fontWeight: "bold",
                            color: "#114c82",
                            
                        }}
                    >
                        User Authentication Store Data in Smart Contract
                    </p>
                    
                </div>
            </div>
        );
    }
}

export default Home;