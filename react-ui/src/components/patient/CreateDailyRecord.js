import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CreateDailyRecord(props) {
  const [dailyrecord, setDailyrecord] = useState({ _id: '', pulseRate: null, bloodPressure: null, 
  weight: null, temperature: null, respiratoryRate: null, nurseUsername: ''});
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/dailyrecord/"+ props.match.params.email;

  const saveDailyRecord = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { pulseRate: dailyrecord.pulseRate, 
        bloodPressure: dailyrecord.bloodPressure, 
        weight: dailyrecord.weight,
        temperature: dailyrecord.temperature,
        respiratoryRate: dailyrecord.respiratoryRate,
        nurseUsername: dailyrecord.nurseUsername,
        creationTime: Date.now,

     };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/dailyrecordlist/' + props.match.params.email)
      }).catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
    e.persist();
    setDailyrecord({...dailyrecord, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
    <h2 style={{textAlign: "center", color: "green"}}>Don't Forget Your Daily Health Check-in </h2>
        <Form onSubmit={saveDailyRecord} style={{marginLeft: 380}}>
          <Form.Group>
            <Form.Label> Pulse Rate</Form.Label>
            <Form.Control type="number" name="pulseRate" id="pulseRate" placeholder="Enter your pulse rate" value={dailyrecord.pulseRate} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label> Blood Pressure</Form.Label>
            <Form.Control type="number" name="bloodPressure" id="bloodPressure" placeholder="Enter your blood pressure" value={dailyrecord.bloodPressure} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Weight</Form.Label>
            <Form.Control type="number" name="weight" id="weight"  placeholder="Enter your weight" value={dailyrecord.weight} onChange={onChange} style={{width: 700}}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>Body Temperature</Form.Label>
            <Form.Control type="number" name="temperature" id="temperature" placeholder="Enter your body temperature" value={dailyrecord.temperature} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Respiratory Rate</Form.Label>
            <Form.Control type="number" name="respiratoryRate" id="respiratoryRate" placeholder="Enter your respiratory rate" value={dailyrecord.respiratoryRate} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>

          <Form.Group>
            <Form.Label>Check by Nurse</Form.Label>
            <Form.Control type="text" name="nurseUsername" id="nurseUsername" placeholder="Enter the nurse name " value={dailyrecord.nurseUsername} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>

          <Button variant="primary" type="submit" style={{width: 700, marginTop: 30 }}>
            Submit Daily Record
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CreateDailyRecord);