import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function DailyRecordList(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/dailyrecordslist/" + props.match.params.email;
  const apiUrlForCheckStatus = "http://localhost:3000/train_model/" + props.match.params.email;
  const [status, setStatus] = useState('');

  useEffect(() => {
    setShowLoading(false);
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const checkStatus = async () => {
    console.log("props.match.params.email >>> ", props.match.params.email);
    const result = await axios(apiUrlForCheckStatus);

    console.log("result.data >>>> ", result.data);
    setStatus(result.data);
  };

  return (
    <div>
      {showLoading && <Spinner animation="border" role="status">
        {/* <span className="sr-only">Loading...</span> */}
      </Spinner>}

      <h2 style={{ textAlign: "center", color: "green" }}>Your Daily Health Record</h2>
      <br/>

      <Table striped bordered hover style={{ marginTop: 20, width: 1200, marginLeft: 150 }}>
        <thead>
          <tr>
            <th>Creation Time</th>
            <th>Nurse Practitioner</th>
            <th>Pulse Rate</th>
            <th>Blood Pressure (systolic/diastolic)</th>
            <th>Weight</th>
            <th>Body Temperature</th>
            <th>Respiratory Rate</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item, idx) => (
            <tr key={idx}>
              <td >{item.creationTime}</td>
              <td>{item.nurseUsername}</td>
              <td>{item.pulseRate}</td>
              <td>{item.systolicPressure}/{item.diastolicPressure}</td>
              <td>{item.weight}</td>
              <td>{item.temperature}</td>
              <td>{item.respiratoryRate}</td>

            </tr>

          ))}
        </tbody>
      </Table>

      <br/>
      <div className="Buttons">
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip>
              Check your medical status using your <strong>3 most recent health records</strong>!!
            </Tooltip>
          }
        >
          <Button className="ButtonSpace" variant="warning" onClick={() => checkStatus()}>Check Current Status</Button>
        </OverlayTrigger>
      </div>

      <br/>
      <br/>
      {status === 'danger'
        ?
        <div className="statusAlert">
          <Alert variant='danger'>
            <b>See a doctor within 24 hours !!</b><br/><br/>
            Your symptoms may require prompt medical evaluation. If your symptoms suddenly get worse, go to the nearest emergency department.
          </Alert>
        </div>
        :
        <div>
        </div>
      }

      {status === 'ok'
        ?
        <div className="statusAlert">
          <Alert variant='success'>
            <b>Self-treatment may be enough</b><br/><br/>
            Usually, your symptoms don’t require medical care and they may resolve on their own. You may try to manage your condition with home remedies. If your symptoms get worse or new symptoms appear, consult a doctor immediately.
          </Alert>
        </div>
        :
        <div>
        </div>
      }
    </div>
  );
}

export default withRouter(DailyRecordList);