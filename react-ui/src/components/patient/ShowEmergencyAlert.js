import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router-dom';
import Home from '../Home';

function ShowEmergencyAlert(props) {
  const [data, setData] = useState({});
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/emergencies/" + props.match.params.id;

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const cancelAlert = (emergencyId, emergency) => {
    const updateUrl = apiUrl;
    const data = { emergencyCode: emergency.emergencyCode, 
        emergencySubject: emergency.emergencySubject, 
        description: emergency.description,
        contactName: emergency.contactName,
        contactNumber: emergency.contactNumber,
        creationTime: emergency.creationTime,
        status: "Canceld",
     };
     axios.put(updateUrl, data)
     .then((result) => {
        window.location.reload(false)
     })
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner> }    
      <Jumbotron>
          <div style={{width: 500, height: 400, backgroundColor: "#fff", borderRadius: 40, marginLeft: 480, textAlign: 'center'}}>
        <h1 style={{color: "red"}}>{data.emergencyCode} Alert</h1>
        <p>Subject: {data.emergencySubject}</p>
        <p>Description: {data.description}</p>
        <p>Contact Name: {data.contactName}</p>
        <p>Contact Number: {data.contactNumber}</p>
        <p>Sent Time: {data.creationTime}</p>
        <p>Status: {data.status}</p>
       
        {data.status === "Active"

        ? <div>
        <h3 style={{color: "green"}}>Waiting for response ...</h3>
        <p>
          <Button type="button" variant="primary" onClick={() => { cancelAlert(data._id, data) }}>Cancel Alert</Button>&nbsp;
        </p>
        </div>

        :        <h3 style={{color: "grey"}}>This emergency alert is no longer available, either resolved or closed</h3>
        }
 </div>
      </Jumbotron>
    </div>
  );
}

export default withRouter(ShowEmergencyAlert);