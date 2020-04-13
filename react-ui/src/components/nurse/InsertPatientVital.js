import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

import '../Registration.css'


function Registration(props) {
    const [vital, setVital]
        = useState({
            bodytemperature: '',
            heartrate: '',
            bloodpressure: '',
            respiratoryrate: '',
            visitedDate: ''
        });

    const [screen, setScreen] = useState('auth');
    const [patientUsername, setPatientUsername] = useState();

    console.log('props.screen', props.screen);
    //check if the user already logged-in
    const readCookie = async () => {
        try {
            console.log('--- in readCookie function ---');

            //
            const res = await axios.get('/read_cookie');
            // 
            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
                console.log(res.data.screen)
                console.log("username::" + res.data.username)
                setPatientUsername(res.data.username)
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

    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/savePatientVital";

    const saveUser = (e) => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            patientUsername: '5e940a884cb8b2c965ceb472',
            bodytemperature: vital.bodytemperature,
            heartrate: vital.heartrate,
            bloodpressure: vital.bloodpressure,
            respiratoryrate: vital.respiratoryrate,
            visitedDate: vital.visitedDate
        };

        axios.post(apiUrl, data)
            .then((result) => {
                setShowLoading(false);
                console.log("what is>>>" + result.data._id) // passing patient Id
                props.history.push('/detailPatientInfo/' + result.data._id)
                
            }).catch((error) => setShowLoading(false));
    };


    const onChange = (e) => {
        e.persist();
        console.log(e.target.value)
        setVital({ ...vital, [e.target.name]: e.target.value });
    }



    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }

            <div className="App">
                <br></br>

                <form className="signUpForm" onSubmit={saveUser}>
                    <div className="form-group row">
                        <label htmlFor="name">Body Temperature</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bodytemperature"
                            name="bodytemperature"
                            value={vital.bodytemperature}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name">Heart Rate</label>
                        <input
                            type="text"
                            className="form-control"
                            id="heartrate"
                            name="heartrate"
                            value={vital.heartrate}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name">Body pressure</label>
                        <input
                            type="text"
                            className="form-control"
                            id="bodypressure"
                            name="bodypressure"
                            value={vital.bodypressure}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="name">Respiratory Rate</label>
                        <input
                            type="text"
                            className="form-control"
                            id="respiratoryrate"
                            name="respiratoryrate"
                            value={vital.respiratoryrate}
                            onChange={onChange}
                        />
                    </div>
                    <div className="form-group row">
                        <label htmlFor="emailInput">Visited Date</label>
                        <input
                            type="text"
                            className="form-control"
                            id="visitedDate"
                            name="visitedDate"
                            value={vital.visitedDate}
                            onChange={onChange}

                        />
                    </div>

                    <button type="submit" className="btn btn-primary btn-block">
                        Submit
                     </button>
                </form>
            </div>
        </div>
    );
}

export default withRouter(Registration);
