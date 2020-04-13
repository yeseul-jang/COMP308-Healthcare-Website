import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './App.css';

//



import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import RegisterPatientInfo from './components/nurse/RegisterPatientInfo';
import CreateEmergencyAlert from './components/patient/CreateEmergencyAlert';
import EmergencyAlertList from './components/patient/EmergencyAlertList';
import EmergencyAlertListAll from './components/nurse/EmergencyAlertList';
import CreateDailyRecord from './components/patient/CreateDailyRecord';
import DailyRecordList from './components/nurse/DailyRecordList';


//
function App() {

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registration">Registration</Nav.Link>
            <Nav.Link href="/emergencies">Emergency Alert</Nav.Link>
            

          </Nav>
        </Navbar.Collapse>
      </Navbar>
    
      <div>          
          <Route render ={()=> < Home />} path="/home" />
          <Route render ={()=> < Login />} path="/login" />
          <Route render ={()=> < Registration />} path="/registration" />
          <Route render ={()=> < RegisterPatientInfo />} path="/registerPatientInfo" />
          <Route render ={()=> < CreateEmergencyAlert />} path="/createEmergency/:username" />
          <Route render ={()=> <EmergencyAlertList />} path="/emergencylist/:username" />
          <Route render ={()=> <EmergencyAlertListAll />} path="/emergencies" />
          <Route render ={()=> < CreateDailyRecord />} path="/createDailyRecord/:username" />
          <Route render ={()=> <DailyRecordList />} path="/dailyrecords" />
      </div>

    </Router>


  );
}

export default App;
