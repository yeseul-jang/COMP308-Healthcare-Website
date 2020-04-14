import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

function DetailPatientInfo(props) {
    const [data, setData] = useState([]);
    const [screen, setScreen] = useState('auth');
 
   
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/detailPatientInfo/" + props.match.params.id;;


    useEffect(() => {
        readCookie();
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            console.log('results from vitals'+ result.data);
            setData(result.data.course);
            /*
            axios.get(apiUrl)
              .then(result => {
                console.log('result.data:',result.data)
                //check if the user has logged in
                if(result.data.screen !== 'auth')
                {
                  
                  console.log('results from vitals', result.data)
                  setData(result.data);
                  setShowLoading(false);
                }
              }).catch((error) => {
                console.log('error in fetchData:', error)
              });*/  
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
                
            }
        } catch (e) {
            setScreen('auth');
            console.log(e);
        }
    };
    return (
        <div>
            <h2>Testing</h2>
 
            <Table responsive>
                        <thead>
                            <tr>
                                <th scope="col">Body Temperature</th>
                                <th scope="col">Heart Rate</th>
                                <th scope="col">Blood Pressure</th>
                                <th scope="col">Respiratory Rate</th>
                                <th scope="col">Visted Date</th>
                                <th scope="col">Patient</th>
                        
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr>
                                    <td>{item.bodytemperature}</td>
                                    <td>{item.heartrate}</td>
                                    <td>{item.bloodpressure}</td>
                                    <td>{item.respiratoryrate}</td>
                                    <td>{item.visitedDate}</td>
                                    <td>{item.patient}</td>
                            
                                </tr>
                            ))}
                        </tbody>
                    </Table>
        </div>
    );

}

export default withRouter(DetailPatientInfo);
