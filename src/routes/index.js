import React from "react";
import {HashRouter, Route} from "react-router-dom";
import Home from "../main/Home";
import MainContent from "../main/MainContent";
import AddGuest from "../main/AddGuest";
import AddCategory from "../main/AddCategory";
import AddSubcategory from "../main/AddSubCategory";

export default () => (<HashRouter>
        <div>
            <Route path="/" exact component={Home}/>
            <Route path="/guests" exact component={MainContent}/>
            <Route path="/addGuest" exact component={AddGuest}/>
            <Route path="/addCategory" exact component={AddCategory}/>
            <Route path="/addSubCategory" exact component={AddSubcategory}/>
        </div>
    </HashRouter>
)