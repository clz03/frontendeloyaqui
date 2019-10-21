import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Estabelecimento from './pages/Estabelecimento';
import Painel from './pages/Painel';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/painel" component={Painel}/>
                <Route path="/estabelecimentos" component={Estabelecimento}/>
            </Switch>
        </BrowserRouter>
    )
}