import { useState, useMemo } from 'react'
import React from "react";
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom';

import VideoPlayerComp from './component/VideoPlayerComp';
import LandingPage from './component/LandingPage';
import {SocketContext,socket} from "./component/SocketContext";


function App() {

  const url_params=[
    // {url:"landing_page",component:LandingPage},
    {url:"video_play",component:VideoPlayerComp},
  ]

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <LandingPage/>

        <Router>
          <Switch>
            {
              url_params.map((item,index)=>(
                <Route 
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
