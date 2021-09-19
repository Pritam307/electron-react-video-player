import { useState, useMemo } from 'react'
import React from "react";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import VideoPlayerComp from './component/VideoPlayerComp';
import LandingPage from './component/LandingPage';
import {SocketContext,socket} from "./component/SocketContext";


function App() {

  const url_params=[
    {url:"",component:LandingPage},
    {url:"video",component:VideoPlayerComp},
  ]

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">

        <Router>
          <Switch>
            {
              url_params.map((item,index)=>(
                <Route 
                  exact
                  key={index}
                  path={"/"+item.url} 
                  component={item.component}
                />
              ))
            }
          </Switch>
        </Router>
      </div>
    
    </SocketContext.Provider>
  )
}

export default App
