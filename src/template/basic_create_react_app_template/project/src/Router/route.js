import React from 'react';
import {Route, BrowserRouter } from "react-router-dom";
import RouteList from './Routers'

const Routes = () => (
    <BrowserRouter basename='/'>
        {
            RouteList.map(routers=><Route exact path={routers.url} component={routers.component}/>)
        }
    </BrowserRouter>
);

export default Routes
