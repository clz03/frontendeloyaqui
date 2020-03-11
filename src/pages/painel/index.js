import React, { useEffect, useState } from "react";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import api from '../../services/api';

export default function Painel({ history }) {
  const [usernome, setUsernome] = useState("");
  //const [estab, setEstab] = useState("");
  const [visitors, setVisitors] = useState("");
  const [delivery, setDelivery] = useState("");
  const [cardapio, setCardapio] = useState("");


  async function getCountVisitors() {
    const userestab = localStorage.getItem('eloyuserestab');
    const response = await api.get('/estabelecimentos/'+ userestab);
    const data = await response.data;
    //setEstab(data);
    setVisitors(data[0].views)
    setDelivery(data[0].delivery)
    setCardapio(data[0].cardapio)
  }

  useEffect(() => {
    document.body.className = "hold-transition skin-blue sidebar-mini";
    document.getElementById('menu_painel').className = "active";
    setUsernome(localStorage.getItem("eloyusernome"));
    getCountVisitors();
  }, []);

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        {/* Content Header (Page header) */}
        <section className="content-header">
          <h4>Seja bem vindo(a), {usernome}</h4>
        </section>

        {/* Main content */}
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              {/* <h2 className="page-header">Seus resultados de Janeiro / 2020</h2> */}

              <div className="box box-info">
              <div className="box-header with-border">
                  <i className="fa fa-bar-chart" />
                  <h3 className="box-title">Estatísticas do seu Estabelecimento</h3>
                </div>
                <div className="box-body">
                  <div className="col-lg-3 col-xs-6">
                    {/* small box */}
                    <div className="small-box bg-green">
                      <div className="inner">
                        <h3>
                          {visitors}<sup style={{ fontSize: 20 }}></sup>
                        </h3>
                        <p>Visitas em sua página</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-person-add" />
                      </div>
                      <a href="/estabelecimento" className="small-box-footer">
                          Atualizar dados da empresa{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                    </div>
                  </div>
                  
                  { delivery && 
                    <div className="col-lg-3 col-xs-6">
                      {/* small box */}
                      <div className="small-box bg-aqua">
                        <div className="inner">
                          <h3>150</h3>
                          <p>Pedidos pelo Delivery</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag" />
                        </div>
                        <a href="/pedidos" className="small-box-footer">
                          Ir para Pedidos{" "}
                          <i className="fa fa-arrow-circle-right" />
                        </a>
                      </div>
                    </div>
                  }

                { cardapio && 
                  <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-red">
                      <div className="inner">
                        <h3>2</h3>
                        <p>Itens no Cardapio</p>
                      </div>
                      <div className="icon">
                        <i className="fa fa-book" />
                      </div>
                      <a href="/cardapios" className="small-box-footer">
                        Ir para Cardapio{" "}
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>
                    }

                  <div className="col-lg-3 col-xs-6">
                    <div className="small-box bg-yellow">
                      <div className="inner">
                        <h3>2</h3>
                        <p>Cupons Utilizados</p>
                      </div>
                      <div className="icon">
                        <i className="ion ion-pricetags" />
                      </div>
                      <a href="/validarcupom" className="small-box-footer">
                        Utilizar Cupom{" "}
                        <i className="fa fa-arrow-circle-right" />
                      </a>
                    </div>
                  </div>

                 
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
              <div className="box-header with-border">
                  <i className="fa fa-line-chart" />
                  <h3 className="box-title">Estatísticas do EloyAqui</h3>
                </div>

                <div className="box-body">                 
                  <table className="table table-hover">
                    <tbody>
                        <tr>
                          <td>
                            Usuários do aplicativo
                          </td>
                          <td>
                            10.254 pessoas
                          </td>
                        </tr>
                        <tr>
                          <td>
                            Estabelecimentos cadastrados
                          </td>
                          <td>
                            520 comércios   
                         </td>
                        </tr>
                      
                    </tbody>
                  </table>
                  
             
                
                </div>
              </div>
            </div>

            <div className="col-md-6"></div>
          </div>
        </section>
        {/* /.content */}
      </div>

      <Footer />
    </>
  );
}
