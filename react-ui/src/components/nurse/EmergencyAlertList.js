import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function EmergencyAlertList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/emergencies/";


  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const markAsResolved = (emergencyId, emergency) => {
    const updateUrl = apiUrl + emergencyId;
    const data = { emergencyCode: emergency.emergencyCode, 
        emergencySubject: emergency.emergencySubject, 
        description: emergency.description,
        contactName: emergency.contactName,
        contactNumber: emergency.contactNumber,
        creationTime: emergency.creationTime,
        status: "Resolved",
     };
     axios.put(updateUrl, data)
     .then((result) => {
        window.location.reload(false)
     })
  }

  const closeAlert = (emergencyId, emergency) => {
    const updateUrl = apiUrl + emergencyId;
    const data = { emergencyCode: emergency.emergencyCode, 
        emergencySubject: emergency.emergencySubject, 
        description: emergency.description,
        contactName: emergency.contactName,
        contactNumber: emergency.contactNumber,
        creationTime: emergency.creationTime,
        status: "Closed",
     };
     axios.put(updateUrl, data)
     .then((result) => {
        window.location.reload(false)
     })
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }

      <h2 style={{textAlign: "center"}}>Received Emergency Alerts</h2>
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Emergency Code</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Contact Name</th>
                <th>Contact Number</th>
                <th>Creation Time</th>
                <th>Patient Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
            <td >{item.emergencyCode}</td>
            <td>{item.emergencySubject}</td>
            <td>{item.description}</td>
            <td>{item.contactName}</td>
            <td>{item.contactNumber}</td>
            <td>{item.creationTime}</td>
            <td>{item.patientId}</td>
            <td>
            {item.status === 'Resolved'
            ?
            <p style={{color: 'green'}}>{item.status}</p>
            : <div>
                {item.status === 'Closed' ?
                <p style={{color: 'red'}}>{item.status}</p>
                : <div>
                     {item.status === 'Active' ?
                <p style={{color: 'blue'}}>{item.status}</p>
                :             <p style={{color: 'blue'}}>{item.status}</p>}
                </div>
                }
            </div>

            }

           
            </td>
            
             
            {item.status === 'Closed' || item.status ==='Resolved'
            ? 
            <td>This emergency alert no longer needs any operations </td>
            :
            
            <td>
              <Button style={{width: 180, height: 35}} variant="success" onClick={ () => markAsResolved(item._id, item)}>Mark as Resolved</Button>
              <Button style={{width: 180, height: 35, marginTop: 15}} variant="danger" onClick={() => closeAlert(item._id, item)}>Close</Button>
              </td>
}<div></div>
              </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(EmergencyAlertList);