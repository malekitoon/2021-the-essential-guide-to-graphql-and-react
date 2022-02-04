import React from 'react';
import { Container } from 'react-bootstrap';
import {
    BrowserRouter,
    Switch,
    Route,
  } from "react-router-dom";

import Header from './components/header';
import Home from './components/home';
import Posts from './components/posts';


const Routes = ()=>(
    <BrowserRouter>
        <Header/>
        <Container className="mt-5">
            <Switch>
                <Route path="/Posts" component={Posts}/>
                <Route path="/" component={Home}/>
            </Switch>
        </Container>
    </BrowserRouter>
)

export default Routes;
