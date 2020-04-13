import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function DetailPatientInfo(props) {
    const [data, setData] = useState([]);
    const [screen, setScreen] = useState('auth');
    const [patientUsername, setPatientUsername] = useState();

    console.log('props.screen', props.screen);

    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/detailPatientInfo/" + props.match.params.id;;


    useEffect(() => {
        readCookie();
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from students' + result.data);
            setData(result.data);
        };
        fetchData();
    }, []);


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
    return (
        <div>
            <h2>Username: {patientUsername}</h2>
            <ListGroup>
                {data.map((item, idx) => (
                    <ListGroup.Item key={idx} action >
                        {item._id} / {item.bodytemperature} / {item.heartrate} / {item.bloodpressure} / {item.respiratoryrate}  / {item.visitedDate} / {item.patient}

                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );

}

export default withRouter(DetailPatientInfo);