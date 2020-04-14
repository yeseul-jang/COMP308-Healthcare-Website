import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ReactPlayer from 'react-player';

import Home from '../Home';

function TryExercises(props) {
    const [screen, setScreen] = useState('auth');
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/tryExercises";
    const [result, setResult] = useState([]);

    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            //
            const res = await axios.get('/read_cookie');
            // 
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                console.log(res.data.screen);
            }
        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };
    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();
    }, []); //only the first render

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }

            {screen === 'auth'
                ?
                <Home screen={screen} setScreen={setScreen} />
                :
                <div>
                    <h1>Try following along with some of these videos:</h1>
                    <div>
                        <ReactPlayer
                        url="https://youtu.be/UItWltVZZmE"
                        />
                    </div>
                    <div>
                        <ReactPlayer
                        url="https://youtu.be/CBWQGb4LyAM"
                        />
                    </div>
                </div>
            }
        </div>
    );

}

export default withRouter(TryExercises);
