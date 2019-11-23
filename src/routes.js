import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Painel from './pages/painel';
import ValidaUsuario from './pages/validausuario';

import New_Estab from './pages/estabelecimentos/new';
import List_Estab from './pages/estabelecimentos/list';
import Edit_Estab from './pages/estabelecimentos/edit';

import New_Prod from './pages/produtos/new';
import List_Prod from './pages/produtos/list';
import Edit_Prod from './pages/produtos/edit';

import New_Cupom from './pages/cupons/new';
import List_Cupom from './pages/cupons/list';
import Edit_Cupom from './pages/cupons/edit';

import New_Noticia from './pages/noticias/new';
import List_Noticia from './pages/noticias/list';
import Edit_Noticia from './pages/noticias/edit';

import New_Usuario from './pages/usuarios/new';
import List_Usuario from './pages/usuarios/list';
import Edit_Usuario from './pages/usuarios/edit';

import New_Administrador from './pages/administradores/new';
import List_Administrador from './pages/administradores/list';
import Edit_Administrador from './pages/administradores/edit';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/painel" component={Painel}/>
                <Route path="/validausuario" component={ValidaUsuario}/>

                <Route path="/estabelecimentos/novo" component={New_Estab}/>
                <Route path="/estabelecimentos/listar" component={List_Estab}/>
                <Route path="/estabelecimentos/:id" component={Edit_Estab}/>

                <Route path="/produtos/novo" component={New_Prod}/>
                <Route path="/produtos/listar" component={List_Prod}/>
                <Route path="/produtos/:id" component={Edit_Prod}/>

                <Route path="/cupons/novo" component={New_Cupom}/>
                <Route path="/cupons/listar" component={List_Cupom}/>
                <Route path="/cupons/:id" component={Edit_Cupom}/>

                <Route path="/noticias/novo" component={New_Noticia}/>
                <Route path="/noticias/listar" component={List_Noticia}/>
                <Route path="/noticias/:id" component={Edit_Noticia}/>

                <Route path="/usuarios/novo" component={New_Usuario}/>
                <Route path="/usuarios/listar" component={List_Usuario}/>
                <Route path="/usuarios/:id" component={Edit_Usuario}/>

                <Route path="/administradores/novo" component={New_Administrador}/>
                <Route path="/administradores/listar" component={List_Administrador}/>
                <Route path="/administradores/:id" component={Edit_Administrador}/>
            </Switch>
        </BrowserRouter>
    )
}