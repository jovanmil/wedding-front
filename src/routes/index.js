import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Home from "../main/Home";
import MainContent from "../main/MainContent";

export default () => (<BrowserRouter>
        <div>
            <Route path="/" exact component={Home}/>
            <Route path="/guests" exact component={MainContent}/>
            {/*<Route path="/channel/:channelId" exact component={Channel}/>*/}
        </div>
    </BrowserRouter>
)