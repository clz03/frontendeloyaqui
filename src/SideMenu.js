import React, { useEffect, useState } from "react";
import api from './services/api';

export default function SideMenu({ history }) {

    const usertype = localStorage.getItem('eloyusertype');
    const [usernome, setUsernome] = useState("");
    const [pedonline, setPedonline] = useState(false);
    const [cardapio, setCardapio] = useState(false);

    const handleSubmit = pagina=> event=> {
        event.preventDefault();
        history.push(pagina)
    }

    function handleLogout(event) {

        event.preventDefault();

        localStorage.removeItem('eloyuseremail');
        localStorage.removeItem('eloyusernome');
        localStorage.removeItem('eloyuserid');
        localStorage.removeItem('eloyusertype');
        localStorage.removeItem('eloyuserestab');
        history.push('/login');
    }

    async function checkButtons() {
        const response = await api.get('/estabelecimentos/' + localStorage.getItem('eloyuserestab'));
        const data = await response.data;
        setPedonline(data[0].pedonline);
        setCardapio(data[0].cardapio);
    }

    useEffect(() => {
        if(usertype == null)
            history.push('/login');
        else
            setUsernome(localStorage.getItem('eloyusernome'));
        checkButtons();
      }, []);


  return (
    <div>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="dist/img/user2-160x160.jpg"
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
              <a href="/estabelecimentos/editar">
                <i className="fa fa-edit" /> <span>Meu Estabelecimento</span>
              
              </a>
            </li>

            <li>
              <a href="/agenda">
                <i className="fa fa-calendar" /> <span>Minha Agenda</span>
              
              </a>
            </li>

            <li>
              <a href="/cardapios/listar">
                <i className="fa fa-book" /> <span>Meu Cardápio</span>
              
              </a>
            </li>

            <li>
              <a href="/cardapios/listar">
                <i className="fa fa-book" /> <span>Meus Pedidos</span>
              
              </a>
            </li>


            <li>
              <a href="/produtos/listar">
                <i className="fa fa-book" /> <span>Destaques</span>
              
              </a>
            </li>

            <li>
              <a href="/cupons/listar">
                <i className="fa fa-book" /> <span>Cupons</span>
              
              </a>
            </li>





          </ul>
        </section>
      </aside>
    </div>
  );
}
