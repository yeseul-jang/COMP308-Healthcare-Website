import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import View from './View'

function Home(props)
{
    const [screen, setScreen] = useState('auth');

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
          console.log(res.data.username)
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

    return (
        <div>
          {screen === 'patient'
          ?
          <View/>
          :
          <div>
            <h1>HOME: {screen}</h1>
            <h2> Hero Healthcare Website</h2>
            <p> created by Hero Group</p>
          </div>
        }
            
        </div>
    );

}

export default withRouter(Home);