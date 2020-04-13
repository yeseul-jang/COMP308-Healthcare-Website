
import { withRouter } from 'react-router-dom';

import React, { Component }  from 'react';

function Home(props)
{


    return (
        <div>
            <h2> Hero Healthcare Website</h2>
            <p> created by Hero Group</p>
        </div>
    );

}

export default withRouter(Home);