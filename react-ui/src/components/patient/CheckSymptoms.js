import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function CheckSymptoms(props) {
  
  const [treatment, setTreatment] = useState({ 
    _id: '', 
    symptom: '', 
    possibleList: '', 
    possibleTreatment: '' 
  });

  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/findId";
  
  const saveSymptoms = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = { symptom: treatment.symptom, 
        possibleList: treatment.possibleList, 
        possibleTreatment: treatment.possibleTreatment
     };
    axios.post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push('/viewTreatment')
      }).catch((error) => {
        setShowLoading(false);
        props.history.push('/viewTreatment');
      });
  };

  const onChange = (e) => {
    e.persist();
    setTreatment({...treatment, [e.target.name]: e.target.value});
  }

  return (
    <div>
      {showLoading && 
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner> 
      } 
      <Jumbotron>
      <h2 style={{textAlign: "center", color: "green"}}>Please select your symptoms:</h2>
        <Form onSubmit={saveSymptoms} style={{marginLeft: 380} }>
          <Form.Group>
            <Form.Check type="checkbox" 
            label = "Runny/Stuffy Nose"
            name="5e95fb0ebd007c7dff62d3a4" id="5e95fb0ebd007c7dff62d3a4" value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
            <Form.Check type="checkbox" 
            label="Cough"
            name="5e95fb3fbd007c7dff62d3a5" id="5e95fb3fbd007c7dff62d3a5"  value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
            <Form.Check type="checkbox" 
            label="Vomiting"
            name="5e95fb4cbd007c7dff62d3a6" id="5e95fb4cbd007c7dff62d3a6"  value={treatment.symptom} onChange={onChange} style={{width: 700}}/>
            <Form.Check type="checkbox" 
            label="Abdominal Pain"
            name="5e95fb60bd007c7dff62d3a7" id="5e95fb60bd007c7dff62d3a7" value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
            <Form.Check type="checkbox" 
            label="Body Aches"
            name="5e95fb6bbd007c7dff62d3a8" id="5e95fb6bbd007c7dff62d3a8" value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
            <Form.Check type="checkbox" 
            label="Breathing Difficulty"
            name="5e95fb7dbd007c7dff62d3a9" id="5e95fb7dbd007c7dff62d3a9" value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
            <Form.Check type="checkbox" 
            label="Congestion"
            name="5e95fb8abd007c7dff62d3aa" id="5e95fb8abd007c7dff62d3aa" value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>

          <Button variant="primary" type="submit" style={{width: 700, marginTop: 30 }}>
            Submit Symptoms
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(CheckSymptoms);