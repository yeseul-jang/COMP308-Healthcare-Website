
import React, { useState } from 'react';
import Home from './Home';
import Button from 'react-bootstrap/Button';
import { Link, Route, BrowserRouter as Router } from "react-router-dom";
import Registration from './Registration';


//
import axios from 'axios';
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;
  const { type, setType } = props;

  // return a stateful value and funcion to update it
  const [data, setData] = useState();

  //
  const [article, setArticle] = useState('');
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable 
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get('/signout');
      setScreen('auth');
    } catch (e) {
      console.log(e);
    }
  };
  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const verifyCookie = async () => {
    try {
      const res = await axios.get('/welcome');
      console.log(res.data)
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="App">
      {screen === 'nurse'
        ? <div>
          <p>test :{screen}</p>

          <Router>
            <header>
              <Link to="/">
                <button>Home</button>
              </Link>
        
              <Link to="/registration">
                <button>Users</button>
              </Link>
            </header>
            <hr />
            <main>
              <Route exact path="/" component={Home} />
              <Route path="/registration" component={Registration} />            
            </main>
          </Router>
          <Button className="ButtonSpace" variant="warning" onClick={deleteCookie}>Log out</Button>
        </div>
        : <Home>
        </Home>
      }
    </div>
  );
}

//
export default View;