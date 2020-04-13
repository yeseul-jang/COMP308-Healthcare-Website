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
  const apiUrl = "ttp://localhost:3000/emergencies" + props.match.params.username;

  useEffect(() => {
    // const fetchData = async () => {
    //   // const result = await axios(apiUrl);
      fetch(apiUrl).then(res => res.json())
      .then((data) => {
        console.log(data)
        setData(data);
        setShowLoading(false);
      })
      .catch(console.log)

    // };
    // fetchData();
  }, []);

//   useEffect(() => {
//     setShowLoading(false);
//     const fetchData = async () => {
//       const result = await axios(apiUrl);
//       setData(result.data);
//       setShowLoading(false);
//     };

//     fetchData();
//   }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showreward/' + id
    });
  }

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner> }
      {/* <ListGroup>
        {data.map((item, idx) => (
          <ListGroup.Item key={idx} action onClick={() => { showDetail(item.documentId) }}>{item.brand}</ListGroup.Item>
        ))}
      </ListGroup> */}
      <h2 style={{textAlign: "center"}}>Emergency Alert Made By {props.match.params.username}</h2>
      <Table striped bordered hover style= {{marginTop: 20, width: 1200, marginLeft: 150}}>
            <thead>
              <tr>
                <th>Emergency Code</th>
                <th>Subject</th>
                <th>Description</th>
                <th>Contact Name</th>
                <th>Contact Number</th>
                <th>Creation Time</th>
                <th>Patient</th>
                <th>Status</th>
              </tr>
            </thead>
            
            <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td className="App-td" action onClick={() => { showDetail(item.documentId) }}>{item.brand}</td>
            <td>{item.emergencyCode}</td>
            <td>{item.emergencySubject}</td>
            <td>{item.description}</td>
            <td>{item.contactName}</td>
            <td>{item.contactNumber}</td>
            <td>{item.creationTime}</td>
            <td>{item.patientId}</td>
            <td>{item.status}</td>
              </tr>
          
        ))}
              </tbody>
            </Table>
    </div>
  );
}

export default withRouter(EmergencyAlertList);