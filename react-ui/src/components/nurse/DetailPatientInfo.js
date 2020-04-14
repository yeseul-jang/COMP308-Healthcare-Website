import React, { useState, useEffect } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';

function DetailPatientInfo(props) {
    const [data, setData] = useState([]);
    const [screen, setScreen] = useState('auth');
    const [patientUsername, setPatientUsername] = useState();

    // console.log('props.screen', props.screen);

    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/detailPatientInfo/" + props.match.params.id;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [tip, setTip] = useState([]);
    const [message, setMessage] = useState('');
    const apiUrlForSendingTip = "http://localhost:3000/sendTip";
    const [currentUserID, setCurrentUserID] = useState('');

    useEffect(() => {
        readCookie();
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from students' + result.data);
            // setCurrentUser(res.data.id);
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
                
                console.log("current user id: ", res.data.id);
                setCurrentUserID(res.data.id);
            }
        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };

    const sendTip = () => {
        const data = {
            patientId: props.match.params.id,
            nurseId: currentUserID,
            tip: tip.tip
        };

        console.log("data >>>>", data);

        axios.post(apiUrlForSendingTip, data).then((result) => {
            console.log("RESULT >>>> ", result);
            
            if (result.data.message != null) {
                setMessage(result.data.message);
            }

        }).catch((error) => {
            console.log("ERROR!! ", error);
        });

        // Close modal
        handleClose();
        readCookie();
    };

    const onChange = (e) => {
        e.persist();
        setTip({ ...tip, [e.target.name]: e.target.value });
    }

    return (
        <div>
            {message.length === 0
            ?
                <div></div>
            :
                <div><Alert variant="success">{message}</Alert></div>
            }

            <h2>Username: {patientUsername}</h2>
            <ListGroup>
                {data.map((item, idx) => (
                    <ListGroup.Item key={idx} action >
                        {item._id} / {item.bodytemperature} / {item.heartrate} / {item.bloodpressure} / {item.respiratoryrate}  / {item.visitedDate} / {item.patient}

                    </ListGroup.Item>
                ))}
            </ListGroup>


            <>
                <Button variant="primary" onClick={handleShow}>send daily motivational tips</Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Send daily motivational tips to the patient !</Modal.Title>
                    </Modal.Header>
                    <Form>
                        <Modal.Body>
                            <Form.Group>
                                {/* <Form.Label>Example textarea</Form.Label> */}
                                <Form.Control as="textarea" rows="5" id="tip" name="tip" onChange={onChange}/>
                            </Form.Group>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={sendTip}>Send</Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            </>
        </div>
    );

}

export default withRouter(DetailPatientInfo);