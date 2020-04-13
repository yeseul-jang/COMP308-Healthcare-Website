import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

function Login(props) {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState('auth');
  //store input field data, user name and password
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const apiUrl = "http://localhost:3000/signin";
  //send email and password to the server
  // for initial authentication
  const auth = async () => {
    console.log('calling auth')
    console.log(email)
    try {
      //make a get request to /authenticate end-point on the server
      const loginData = { auth: { email, password } }
      //call api
      const res = await axios.post(apiUrl, loginData);
      console.log("id:"+res.data.id)
      console.log("email:"+res.data.email)

      console.log(res.data.screen)
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        setEmail(res.data.email)
        console.log("test>>>>>"+res.data.screen);

        props.history.push('/home');
        window.location.reload(false);
      }
    } catch (e) { //print the error
      console.log(e);
    }
    
  };

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

  const register = () => {
    props.history.push({
      pathname: '/registration'
    });
  }

  //
  return (
    <div>
      <br /><br />
      <div className="LoginForm">
        {screen === 'auth'
          ?
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Email" type="text" onChange={e => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <div className="Buttons">
              <Button className="ButtonSpace" variant="primary" onClick={auth}>Login</Button>
              <Button className="ButtonSpace" variant="success" onClick={() => { register() }}>Regester</Button>
            </div>
          </Form>

          : 
          <div></div>
        }
      </div>
    </div>
  );
}

export default withRouter(Login);

