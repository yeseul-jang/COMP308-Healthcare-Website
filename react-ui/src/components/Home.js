import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import homeImg from './home.png';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function Home(props) {
    const [screen, setScreen] = useState('auth');
    const [param, setParam] = useState();
    const [fullName, setFullName] = useState('');
    const [currentUserId, setCurrentUserId] = useState('');
    const [dailyTips, setDailyTips] = useState([]);
    const apiUrl = "http://localhost:3000/getDailyTips";

    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            //
            const res = await axios.get('/read_cookie');
            // 
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                setFullName(res.data.fullName);
                setParam(res.data.email)
            }
        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };

    const fetchData = async () => {
        const res = await axios.get('/read_cookie');  
        if(res.data.id != 'undefined') {
            var newApiUrl = apiUrl + "/" + res.data.id;
    
            console.log("newApiUrl >>> ", newApiUrl);
    
            const result = await axios(newApiUrl);
            console.log('results >>>>>>> ' + result.data);
    
            if (result.data == null) {
                console.log("result.data is null!!");
            }
    
            setDailyTips(result.data);
        }   
    };

    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();

        // get daily tips
        fetchData();
    }, []); //only the first render

    return (
        <div>
            <div className="home">
                {/* <h1>HOME: {screen}</h1> */}

                <div className="homeLeft">
                    <h2>Welcome,</h2>
                    <h2 className="fullName">{fullName}</h2>
                    <br />
                    {screen === 'nurse'
                        ?
                        <div>
                            <h5>We will help you to monitor</h5>
                            <h5>your patients' daily activities!</h5>

                            <br />
                            <div className="Buttons">
                                <Button className="ButtonSpace" variant="primary" href="/searchPatient">Search Your Patients</Button>
                            </div>
                        </div>
                        :
                        <div>
                          
                            <h5>We will help you to monitor</h5>
                            <h5>your daily activities!</h5>
                        </div>
                    }
                    <br />
                    {screen === 'patient'
                        ?
                        
                            <View param={param} setParam={setParam}/>
                            : <div></div>
                    }
                    <br />
                    

                    {screen === 'auth'
                        ?
                        <div className="Buttons">
                            <Button className="ButtonSpace" variant="primary" href="/login">Login</Button>
                            <Button className="ButtonSpace" variant="success" href="/registration">Regester</Button>
                        </div>
                        :
                        <div></div>
                    }
                </div>

                <div className="homeRight">
                    <img className="homeImg" src={homeImg} alt='home image'></img>
                </div>

            </div>

            {screen === 'patient' && dailyTips.length !== 0
                ?
                <div className="dailyTips">
                    <br /><br /><br /><br/>
                    <h4><b>Check the daily motivational tips from nurses!</b></h4>
                    <br/>

                    <div className ="CardArea">
                        {dailyTips.map((item, idx) => (
                            <div className="tipCard">
                                <Card style={{ width: '18rem' }}>
                                <Card.Body>
                                    <Card.Title>Tip from {item.nurse.firstname}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{item.timestamp}</Card.Subtitle>
                                    <Card.Text>{item.dailytip}</Card.Text>
                                </Card.Body>
                                </Card>
                            </div>
                        ))}
                    </div>
                </div>
                

                :
                <div></div>


                
            }

        </div>
    );

}

export default withRouter(Home);