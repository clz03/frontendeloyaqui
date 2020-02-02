import React, { useEffect, useState } from "react";
import api from './services/api';

export default function SideMenu({ history }) {

  const [usernome, setUsernome] = useState("");
  const [pedonline, setPedonline] = useState(false);
  const [cardapio, setCardapio] = useState(false);

    useEffect(() => {
      const usertype = localStorage.getItem('eloyusertype');

      if(usertype === null)
        window.location.href = "/login";
      else
          setUsernome(localStorage.getItem('eloyusernome'));
    }, []);


  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="dist/img/user.png"
                className="img-circle"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>{usernome}</p>
              <a href="url_f">
                <i className="fa fa-circle text-success" /> Online
              </a>
            </div>
          </div>

   

          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MENU PRINCIPAL</li>

            <li className="active">
              <a href="/painel">
                <i className="fa fa-laptop" /> <span>Inicio</span>
              </a>
            </li>

            
            <li>
              <a href="/estabelecimento">
                <i className="fa fa-edit" /> <span>Meu Estabelecimento</span>
              
              </a>
            </li>

            <li>
              <a href="/produtos">
                <i className="fa fa-bullhorn" /> <span>Destaques</span>
              
              </a>
            </li>

            <li>
              <a href="/cupons">
                <i className="fa fa-ticket" /> <span>Cupons</span>
              
              </a>
            </li>

            <li>
              <a href="/agenda">
                <i className="fa fa-calendar" /> <span>Minha Agenda</span>
              
              </a>
            </li>

            <li>
              <a href="/cardapio">
                <i className="fa fa-book" /> <span>Meu Cardápio</span>
              
              </a>
            </li>

            <li>
              <a href="/cardapios/listar">
                <i className="fa fa-cutlery" /> <span>Meus Pedidos</span>
              
              </a>
            </li>


            

            <li>
             &nbsp;
            </li>
            <li>
             &nbsp;
            </li>

            <li>
              <a href="/cupons">
                <i className="fa fa-commenting-o" /> <span>Preciso de ajuda</span>
              
              </a>
            </li>




          </ul>
        </section>
      </aside>
    </>
  );
}
