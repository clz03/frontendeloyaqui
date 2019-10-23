import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Painel from './pages/Painel';
import Novo_Estab from './pages/Novo_Estab';
import List_Estab from './pages/List_Estab';
import Edit_Estab from './pages/Edit_Estab';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/painel" component={Painel}/>
                <Route path="/estabelecimentos/novo" component={Novo_Estab}/>
                <Route path="/estabelecimentos/listar" component={List_Estab}/>
                <Route path="/estabelecimentos/:id" component={Edit_Estab}/>
            </Switch>
        </BrowserRouter>
    )
}