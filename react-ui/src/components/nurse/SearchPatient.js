import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import Home from '../Home';

function SearchPatient(props) {
    const [screen, setScreen] = useState('auth');
    const [showLoading, setShowLoading] = useState(false);
    const apiUrl = "http://localhost:3000/searchPatient";
    const [search, setSearch] = useState({
        type: '',
        str: ''
    });
    const [result, setResult] = useState([]);

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
    //runs the first time the view is rendered
    //to check if user is signed in
    useEffect(() => {
        readCookie();
    }, []); //only the first render


    const searchPatient = (e) => {
        setShowLoading(true);
        e.preventDefault();

        if (search.type == '') {
            search.type = 'id';
        }
        const data = {
            type: search.type,
            str: search.str
        };
        console.log("data >>>>>>>>>> ", data);

        axios.post(apiUrl, data).then((result) => {
            setShowLoading(false);

            console.log('result.data:', result.data)
            //check if the user has logged in
            if (result.data.screen !== 'auth') {
                console.log('data in if:', result.data)
                setResult(result.data);
                setShowLoading(false);
            }

        }).catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setSearch({ ...search, [e.target.name]: e.target.value });
    }

  
    const detail = (id) => {
      console.log("check user id: " +id);
      props.history.push({
        pathname: '/detailPatientInfo/' + id
      });
    }

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }

            {screen === 'auth'
                ?
                <Home screen={screen} setScreen={setScreen} />
                :
                <div className="searchForm">
                    <h2 className="title">Search Your Patient !</h2>

                    <Form onSubmit={searchPatient}>
                        <Form.Group>
                            <Form.Row>
                                <Form.Control className="select" as="select" id="type" name="type" onChange={onChange}>
                                    <option value="id">ID</option>
                                    <option value="firstName">First Name</option>
                                    <option value="lastName">Last Name</option>
                                    <option value="email">Email Address</option>
                                    <option value="dateOfBirth">Date Of Birth</option>
                                </Form.Control>
                                <Form.Control type="text" className="searchTxt" id="str" name="str" onChange={onChange} />

                                <Button type="submit" className="searchBtn">Search</Button>
                            </Form.Row>
                        </Form.Group>
                    </Form>
                </div>
            }

            <br/>

            {result.length !== 0
                ?
                <div className="searchForm">
                    <h4 className="title">Patient Search Result</h4>
                    <br />
                    <br />
                    <Table responsive>
                        <thead>
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">First Name</th>
                                <th scope="col">Last Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Date Of Birth</th>
                                <th></th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            {result.map((item, idx) => (
                                <tr>
                                    <td>{item.username}</td>
                                    <td>{item.firstname}</td>
                                    <td>{item.lastname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phoneNumber}</td>
                                    <td>{item.dateOfbirth}</td>
                                    <td>
                                        <Button  className="ButtonSpace" onClick={() => { detail(item._id) }}>Detail</Button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <br />
                    <h5 className="title">Total: {result.length}</h5>
                </div>
                :
                <div></div>
            }

        </div>
    );

}

export default withRouter(SearchPatient);