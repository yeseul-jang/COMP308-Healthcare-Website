import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';

function AddSymptoms(props) {
  const [treatment, setTreatment] = useState({ 
        _id: '', 
        symptom: '', 
        possibleList: '', 
        possibleTreatment: '' 
    });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/addTreatment";

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
        props.history.push('/addTreatment')
      }).catch((error) => setShowLoading(false));
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
    <h2 style={{textAlign: "center", color: "green"}}>Don't Forget Your Daily Health Check-in </h2>
        <Form onSubmit={saveSymptoms} style={{marginLeft: 380}}>
          <Form.Group>
            <Form.Label>Symptoms</Form.Label>
            <Form.Control type="text" name="symptom" id="symptom" placeholder="Enter your symptom" value={treatment.symptom} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label> possibleList</Form.Label>
            <Form.Control type="text" name="possibleList" id="possibleList" placeholder="Enter your possibleList" value={treatment.possibleList} onChange={onChange} style={{width: 700 }}/>
          </Form.Group>
          <Form.Group>
            <Form.Label>possibleTreatment</Form.Label>
            <Form.Control type="text" name="possibleTreatment" id="possibleTreatment"  placeholder="Enter your possibleTreatment" value={treatment.possibleTreatment} onChange={onChange} style={{width: 700}}/>
          </Form.Group>

          <Button variant="primary" type="submit" style={{width: 700, marginTop: 30 }}>
            Submit 
          </Button>
        </Form>
      </Jumbotron>
    </div>
  );
}

export default withRouter(AddSymptoms);