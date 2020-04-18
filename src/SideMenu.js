import React, { useEffect, useState } from "react";
import api from './services/api';

export default function SideMenu({ history }) {

  const [usernome, setUsernome] = useState("");
  const [agendamento, setAgendamento] = useState(false);
  const [cardapio, setCardapio] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [online, setOnline] = useState(true);
  const userestab = localStorage.getItem('eloyuserestab');
  //const usertype = localStorage.getItem('eloyusertype');

  async function checkMenu() {
    const response = await api.get('/estabelecimentos/' + userestab);
    const data = await response.data;
    setAgendamento(data[0].agendamento);
    setCardapio(data[0].cardapio);
    setDelivery(data[0].delivery);
    setOnline(data[0].online);
  };

  async function atualizaStatus(status) {
    const txtstatus = status == true ? 'online' : 'offline';
    if (window.confirm('Confirma alterar seu status para ' + txtstatus + ' ?')){
      await api.put('/estabelecimentos/'+ userestab, {online:status})
      localStorage.setItem('eloyuserestabonline', status);
      window.location.reload();
    }
  }

  useEffect(() => {
    if(userestab === null)
      window.location.href = "/login";
    else
      setUsernome(localStorage.getItem('eloyusernome'));
      checkMenu();
  }, []);


  return (
    <>
      <aside className="main-sidebar">
        <section className="sidebar">
          <div className="user-panel">
            <div className="pull-left image">
              <img
                src="/dist/img/user.png"
                className="img-circle"
                alt="User"
              />
            </div>
            <div className="pull-left info">
              <p>{usernome}</p>

              {online &&
                <a id='status_estab' info='online'>
                  <i className="fa fa-circle text-success" /> Online
                </a>
              }

              {!online &&
                <a id='status_estab' info='offline'>
                    <i className="fa fa-circle text-danger" /> Offline
                </a>
              }

              {!online &&
                <a style={{cursor:'pointer'}} onClick={() => atualizaStatus(true)}>
                  <span className="text-success">(ficar online)</span>
                </a>
              }

              {online &&
              <a style={{cursor:'pointer'}} onClick={() => atualizaStatus(false)}>
                <span className="text-danger">(ficar offline)</span>
              </a>
              }
            </div>
          </div>

   

          <ul className="sidebar-menu" data-widget="tree">
            <li className="header">MENU PRINCIPAL</li>

            {/* <li className="active"> */}
            <li id="menu_painel">
              <a href="/painel">
                <i className="fa fa-bar-chart" /> <span>Painel</span>
              </a>
            </li>

            
            <li id="menu_estabelecimento">
              <a href="/estabelecimento">
                <i className="fa fa-hospital-o" /> <span>Meu Estabelecimento</span>
              </a>
            </li>

            {cardapio &&
              <li id="menu_cardapio">
                <a href="/cardapios">
                  <i className="fa fa-book" /> <span>Meu Cardápio</span>
                </a>
              </li>
            }
            
            {delivery &&
              <li id="menu_pedidos">
                <a href="/pedidos">
                  <i className="fa fa-cutlery" /> <span>Meus Pedidos&nbsp;&nbsp;
                  {online &&
                    <img src='/dist/img/active_menu.gif' width="12"></img>
                  }
                  </span>
                </a>
              </li>
            }

                


            {agendamento && 
              <li id="menu_agenda">
                <a href="/agenda">
                  <i className="fa fa-calendar-check-o" /> <span>Clientes Agendados</span>
                </a>
              </li>
            }

            <li id="menu_produto">
              <a href="/produtos">
                <i className="fa fa-bullhorn" /> <span>Produtos / Serviços</span>
              </a>
            </li>

            {agendamento && 
            <li id="menu_servico">
              <a href="/servicos">
                <i className="fa fa-calendar" /> <span>Serviços com Agendamento</span>
              </a>
            </li>
            }

            <li id="menu_cupons">
              <a href="/cupons">
                <i className="fa fa-tag" /> <span>Cupons</span>
              </a>
            </li>

            <li id="menu_validarcupom">
              <a href="/validarcupom">
                <i className="fa fa-check" /> <span>Validar Cupom</span>
              </a>
            </li>

            <li>
             &nbsp;
            </li>
            <li>
             &nbsp;
            </li>

            <li id="menu_suporte">
              <a href="/suporte">
                <i className="fa fa-commenting-o" /> <span>Preciso de ajuda</span>
              </a>
            
            </li>

            {/* <li id="menu_financeiro">
              <a href="/suporte">
                  <i className="fa fa-file-text-o" /> <span>Financeiro</span>
              </a>
            </li> */}

          </ul>
        </section>
      </aside>
    </>
  );
}
