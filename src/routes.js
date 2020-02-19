import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/login/index';
import Painel from './pages/painel/index';
import AdmPainel from './pages/admpainel';
import AgendaEventos from './pages/agenda_eventos';
import ValidaUsuario from './pages/validausuario';
import RedefinirSenha from './pages/redefinirsenha';
import AdmRedefinirSenha from './pages/admredefinirsenha';
import EsqueciSenha from './pages/esquecisenha';
import PreCadastro from './pages/precadastro/index2';
import Ajuda from './pages/ajuda/index';

import New_Estab from './pages/estabelecimentos/novo';
import List_Estab from './pages/estabelecimentos/list';
import Edit_Estab from './pages/estabelecimentos/index';

import New_Prod from './pages/produtos/novo';
import List_Prod from './pages/produtos/index';
import Edit_Prod from './pages/produtos/edit';

import New_Cupom from './pages/cupons/novo';
import List_Cupom from './pages/cupons/index';
import Edit_Cupom from './pages/cupons/edit';
import Validar_Cupom from './pages/cupons/validar';

import New_Noticia from './pages/noticias/new';
import List_Noticia from './pages/noticias/list';
import Edit_Noticia from './pages/noticias/edit';

import New_Usuario from './pages/usuarios/new';
import List_Usuario from './pages/usuarios/list';
import Edit_Usuario from './pages/usuarios/edit';

import New_Administrador from './pages/administradores/new';
import List_Administrador from './pages/administradores/list';
import Edit_Administrador from './pages/administradores/edit';

import New_Cardapio from './pages/cardapios/novo';
import List_Cardapio from './pages/cardapios/index';
import Edit_Cardapio from './pages/cardapios/edit';

import New_Endereco from './pages/enderecos/new';
import List_Endereco from './pages/enderecos/list';
import Edit_Endereco from './pages/enderecos/edit';

import List_Pedidos from './pages/pedidos/index';
import Edit_Pedidos from './pages/pedidos/edit';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/login" component={Login} />
                <Route path="/painel" component={Painel}/>
                <Route path="/admpainel" component={AdmPainel}/>
                <Route path="/validausuario" component={ValidaUsuario}/>
                <Route path="/redefinirsenha" component={RedefinirSenha}/>
                <Route path="/admredefinirsenha" component={AdmRedefinirSenha}/>
                <Route path="/esquecisenha" component={EsqueciSenha}/>
                <Route path="/agenda" component={AgendaEventos}/>
                <Route path="/precadastro" component={PreCadastro}/>
                <Route path="/suporte" component={Ajuda}/>

                <Route path="/estabelecimentos/novo" component={New_Estab}/>
                <Route path="/estabelecimentos/listar" component={List_Estab}/>
                <Route path="/estabelecimento" component={Edit_Estab}/>
                <Route path="/estabelecimentos/editar/:id" component={Edit_Estab}/>

                <Route path="/produto/novo" component={New_Prod}/>
                <Route path="/produtos" component={List_Prod}/>
                <Route path="/produto/:id" component={Edit_Prod}/>

                <Route path="/cupom/novo" component={New_Cupom}/>
                <Route path="/cupons" component={List_Cupom}/>
                <Route path="/cupom/:id" component={Edit_Cupom}/>
                <Route path="/validarcupom" component={Validar_Cupom}/>

                <Route path="/noticias/novo" component={New_Noticia}/>
                <Route path="/noticias/listar" component={List_Noticia}/>
                <Route path="/noticias/:id" component={Edit_Noticia}/>

                <Route path="/usuarios/novo" component={New_Usuario}/>
                <Route path="/usuarios/listar" component={List_Usuario}/>
                <Route path="/usuarios/:id" component={Edit_Usuario}/>

                <Route path="/administradores/novo" component={New_Administrador}/>
                <Route path="/administradores/listar" component={List_Administrador}/>
                <Route path="/administradores/:id" component={Edit_Administrador}/>

                <Route path="/cardapio/novo" component={New_Cardapio}/>
                <Route path="/cardapios" component={List_Cardapio}/>
                <Route path="/cardapio/:id" component={Edit_Cardapio}/>

                <Route path="/enderecos/novo" component={New_Endereco}/>
                <Route path="/enderecos/listar" component={List_Endereco}/>
                <Route path="/enderecos/:id" component={Edit_Endereco}/>

                <Route path="/pedidos" component={List_Pedidos}/>
                <Route path="/pedido/:id" component={Edit_Pedidos}/>
            </Switch>
        </BrowserRouter>
    )
}