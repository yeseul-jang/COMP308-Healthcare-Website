import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import '../Registration.css'


function InsertPatientVital(props) {
    const [vital, setVital]
        = useState({
            bodytemperature: '',
            heartrate: '',
            bloodpressure: '',
            respiratoryrate: '',
            visitedDate: ''
        });


    const [valid, setValidation]
        = useState({
            isDateValid: false
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
                setPatientUsername(props.match.params.id)
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
        console.log(">>>test id :::" + props.match.params.id)
        e.preventDefault();
        const data = {
            patientUsername: patientUsername,
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
                props.history.push('/detailPatientInfo/' + props.match.params.id)

            }).catch((error) => setShowLoading(false));

    };



    const onChange = (e) => {
        //e.persist();
        console.log(e.target.value)
        setVital({ ...vital, [e.target.name]: e.target.value });
    }
    const validateDate = (e) => {
        const dateNumberRegExp = /^\d{4}-\d{2}-\d{2}$/;
        console.log(e.target.value)
        if (e.target.value.match(dateNumberRegExp)) {
            setValidation({ isDateValid: true })
        } else {
            setValidation({ isDateValid: false })
        }
        setVital({ ...vital, [e.target.name]: e.target.value });
    };

        const isEnteredDateValid = () => { if (vital.visitedDate) return valid.isDateValid;};

        const inputClassNameHelper = boolean => {
            switch (boolean) {
                case true:
                    return 'is-valid';
                case false:
                    return 'is-invalid';
                default:
                    return '';
            }
        };

        const goback = (id) => {
            console.log("check user id: " + id);
            props.history.push({
                pathname: '/savePatientVital/' + id
            });
        };



        return (
            <div>
                {showLoading &&
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                }

                <div className="App">
                    <br></br>
                    <h2> Register a New Vital Signs</h2>


                    <form className="signUpForm" onSubmit={saveUser}>
                        <div className="form-group row">
                            <label htmlFor="name">Body Temperature</label>
                            <input
                                type="number"
                                className="form-control"
                                id="bodytemperature"
                                name="bodytemperature"
                                placeholder="Only number is available"
                                value={vital.bodytemperature}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name">Heart Rate</label>
                            <input
                                type="number"
                                className="form-control"
                                id="heartrate"
                                name="heartrate"
                                placeholder="Only number is available"
                                value={vital.heartrate}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name">Body pressure</label>
                            <input
                                type="number"
                                className="form-control"
                                id="bodypressure"
                                name="bodypressure"
                                placeholder="Only number is available"
                                value={vital.bodypressure}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="name">Respiratory Rate</label>
                            <input
                                type="text"
                                className="form-control"
                                id="respiratoryrate"
                                name="respiratoryrate"
                                placeholder="Only number is available"
                                value={vital.respiratoryrate}
                                onChange={onChange}
                                required
                            />
                        </div>
                        <div className="form-group row">
                            <label htmlFor="emailInput">Visited Date</label>
                            <input
                                type="text"
                                className={`form-control ${inputClassNameHelper(isEnteredDateValid())}`}
                                id="visitedDate"
                                name="visitedDate"
                                placeholder="yyyy-mm-dd"
                                value={vital.visitedDate}
                                onChange={validateDate}
                                required

                            />
                        </div>

                        <button type="submit" className="btn btn-info btn-block">
                            Submit
                        </button>
                        <button className="btn btn-success btn-block " onClick={() => { goback(patientUsername) }}>
                            Cancel
                        </button>

                    </form>
  
            </div>
        </div >
    );
}

export default withRouter(InsertPatientVital);
