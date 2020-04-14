import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';

import './Registration.css'


function Confirmation(props) {
    const [user, setUser]
        = useState({
            _id: '',
            usertype: '',
            password: '',
            firstname: '',
            lastname: '',
            address: '',
            city: '',
            postalCode: '',
            phoneNumber: '',
            email: '',
            dateOfbirth: ''
        });

    const [showLoading, setShowLoading] = useState(false);

    const detail = () => {

        props.history.push({
          pathname: '/login'
        });
      }

    return (
        <div>
            {showLoading &&
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            }
            <br></br>
            <div className="App">
                <br></br>
                <div className="confirm">
                    
                        <h2> Welcome!  </h2>
                        <h1> This is Hero Healthcare System</h1>
                      
                        <h4> Good to see you here.</h4>
                        <br></br>
                        
                        <br></br>
                        <button type="submit" onClick={() => { detail() }} className="btn btn-outline-primary">
                            LET'S START
                     </button>
                </div>
            </div>
        </div>
    );
}



export default withRouter(Confirmation);
