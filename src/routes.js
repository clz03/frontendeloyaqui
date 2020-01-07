import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login';
import Painel from './pages/painel';
import AdmPainel from './pages/admpainel';
import AgendaEventos from './pages/agenda_eventos';
import ValidaUsuario from './pages/validausuario';
import RedefinirSenha from './pages/redefinirsenha';
import AdmRedefinirSenha from './pages/admredefinirsenha';
import EsqueciSenha from './pages/esquecisenha';
import PreCadastro from './pages/precadastro';

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

import New_Cardapio from './pages/cardapios/new';
import List_Cardapio from './pages/cardapios/list';
import Edit_Cardapio from './pages/cardapios/edit';

import New_Endereco from './pages/enderecos/new';
import List_Endereco from './pages/enderecos/list';
import Edit_Endereco from './pages/enderecos/edit';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login}/>
                <Route path="/painel" component={Painel}/>
                <Route path="/admpainel" component={AdmPainel}/>
                <Route path="/validausuario" component={ValidaUsuario}/>
                <Route path="/redefinirsenha" component={RedefinirSenha}/>
                <Route path="/admredefinirsenha" component={AdmRedefinirSenha}/>
                <Route path="/esquecisenha" component={EsqueciSenha}/>
                <Route path="/agenda" component={AgendaEventos}/>
                <Route path="/precadastro" component={PreCadastro}/>

                <Route path="/estabelecimentos/novo" component={New_Estab}/>
                <Route path="/estabelecimentos/listar" component={List_Estab}/>
                <Route path="/estabelecimentos/editar" component={Edit_Estab}/>
                <Route path="/estabelecimentos/editar/:id" component={Edit_Estab}/>

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

                <Route path="/cardapios/novo" component={New_Cardapio}/>
                <Route path="/cardapios/listar" component={List_Cardapio}/>
                <Route path="/cardapios/:id" component={Edit_Cardapio}/>

                <Route path="/enderecos/novo" component={New_Endereco}/>
                <Route path="/enderecos/listar" component={List_Endereco}/>
                <Route path="/enderecos/:id" component={Edit_Endereco}/>
            </Switch>
        </BrowserRouter>
    )
}