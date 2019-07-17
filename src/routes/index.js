import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import LoginForm from "../forms/LoginForm";

export default () => (<BrowserRouter>
        <div>
            <Route path="/" exact component={LoginForm}/>
            {/*<Route path="/users" exact component={Users}/>*/}
            {/*<Route path="/channel/:channelId" exact component={Channel}/>*/}
        </div>
    </BrowserRouter>
)