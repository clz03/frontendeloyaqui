import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function List_Pedidos({ history }) {

const [pedido, setPedido] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');

const userestab = localStorage.getItem('eloyuserestab');
const usertype = localStorage.getItem('eloyusertype');

async function loadPedido() {
  const response = await api.get('/pedidos/estabelecimento/' + userestab );
  const data = await response.data;

  setPedido(data);
  setLoading(false);
}

  useEffect(() => {
    setLoading(true);
    loadPedido();
    setMsgvazio("Nenhum pedido encontrado");
  }, []);


  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    Pedidos<small>Pedidos realizados</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                            <a class="btn btn-app">
                              <i class="fa fa-edit"></i> Cancelar Selecionado
                            </a>

                            <table className="table table-hover">
                              <tbody>
                              <tr>
                                <th>Pedido</th>
                                <th>Recebido</th>
                                <th>Status</th>
                                <th>Tipo</th>
                                <th>Cliente</th>
                                <th>Endereco</th>
                              </tr>
                              {pedido.length ? pedido.map(pedido => 
                                  <tr>
                                    <td>
                                      <a href={'/pedidos/' + pedido._id}>#3456</a>
                                    </td>
                                    <td>
                                      {pedido.data.substring(8,10) + "/" + pedido.data.substring(5,7) + "/" + pedido.data.substring(0,4) + ' - ' + pedido.data.substring(11,16)}
                                    </td>
                                    <td>
                                      <span class="label label-warning">{pedido.status}</span>
                                    </td>
                                    <td>
                                      {pedido.tipoentrega === 'E' ? 'Entrega' : 'Retira'}
                                    </td>
                                    <td>
                                      Joao
                                    </td>
                                    <td>
                                      {pedido.rua}, {pedido.numero}
                                    </td>
                                  </tr>
                              ) : "Nenhum pedido encontrado"}
                              </tbody>
                            </table>


                            </div>
                            {/* /.box-body */}
                        </div>
                        {/* /.box */}
                    </div>
                </div>
            </section>
            {/* /.content */}
        </div>
    </div>
    
    <Footer/>
    </>
)
}

