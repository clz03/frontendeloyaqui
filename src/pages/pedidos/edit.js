import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function List_Pedidos({ history }) {

  const [pedido, setPedido] = useState("");
  const [itenspedido, setItenspedido] = useState("");
  const [status, setStatus] = useState("");
  const [tipoentrega, setTipoentrega] = useState("");
  const [loading, setLoading] = useState("");

  const url_string = window.location.href;
  const param = url_string.split("/");

  const statusArr = [
    { label: "Pedido enviado ao restaurante", value: "1" },
    { label: "Pedido em preparação e sairá para entrega em breve", value: "2" },
    { label: "Pedido em preparação e estará pronto para retirada em breve", value: "3" },
    { label: "Pedido saiu para entrega", value: "4" },
    { label: "Pedido pronto para ser retirado", value: "5" },
    { label: "Pedido cancelado", value: "6" },
    { label: "Pedido entregue", value: "7" }
  ];

  async function loadPedido() {
    const response = await api.get("/pedidos/" + param[4]);
    const data = await response.data;

    setPedido(data);
    setStatus(data[0].status);
    setTipoentrega(data[0].tipoentrega);

    loadItensPedido();
  }

  async function loadItensPedido() {
    const response = await api.get("/itenspedido/pedido/" + param[4]);
    const data = await response.data;

    setItenspedido(data);
  }


  async function atualizaStatus(status) {

    const dataobj = { 
      status: status
    };

    await api.put('/pedidos/'+param[4], dataobj)
    history.push('/pedidos')
  }


  useEffect(() => {
    loadPedido();
  }, []);

  
  return (
    <>
      <Header />
      <SideMenu />

      <div>
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Pedidos<small>(pedidos de hoje)</small>
            </h1>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                  <div className="box-body table-responsive">

                  {status && status === '1' &&
                  <>
                    <button type="button" className="btn bg-red btn-flat margin" onClick={() => atualizaStatus('6')}>Cancelar Pedido</button>
                    {tipoentrega === 'E' ? 
                      <button type="button" className="btn bg-olive btn-flat margin" onClick={() => atualizaStatus('2')}>Aceitar Pedido</button> 
                      : 
                      <button type="button" className="btn bg-olive btn-flat margin" onClick={() => atualizaStatus('3')}>Aceitar Pedido</button>
                    }
                  </>
                  }

                  {status && status === '2' &&
                  <>
                    <button type="button" className="btn bg-olive btn-flat margin" onClick={() => atualizaStatus('4')}>Pedido Pronto (saiu para entrega)</button>
                  </>
                  }

                  {status && status === '3' &&
                  <>
                    <button type="button" className="btn bg-olive btn-flat margin" onClick={() => atualizaStatus('5')}>Pedido Pronto (retirar)</button>
                  </>
                  }

                  {status === '4' &&
                  <>
                    <button type="button" className="btn bg-olive btn-flat margin" onClick={() => atualizaStatus('7')}>Pedido entregue</button>
                  </>
                  }

                  {status === '5' &&
                  <>
                    <button type="button" className="btn bg-olive btn-flat margin" onClick={() => atualizaStatus('7')}>Pedido entregue</button>
                  </>
                  }

                    {pedido.length &&
                      pedido.map(pedido => (
                        <table className="table table-hover">
                          <tbody>
                            <tr>
                              <th>Nome Cliente:</th>
                              <td>{pedido.idusuario.nome}</td>
                            </tr>
                            <tr>
                              <th>Telefone Cliente:</th>
                              <td>{pedido.idusuario.telefone}</td>
                            </tr>
                            <tr>
                              <th>Data / Hora do Pedido:</th>
                              <td>
                                {pedido.data.substring(8, 10) +
                                  "/" +
                                  pedido.data.substring(5, 7) +
                                  "/" +
                                  pedido.data.substring(0, 4) +
                                  " - " +
                                  pedido.data.substring(11, 16)}
                              </td>
                            </tr>
                            <tr>
                              <th>Status:</th>
                              <td>
                                {statusArr.map((statusArr) =>
                                  statusArr.value === pedido.status ? <span key={statusArr.value} className="label label-warning">{statusArr.label}</span> : ''
                                )}
                              </td>
                            </tr>
                            <tr>
                              <th>Entrega ou Retira:</th>
                              <td>
                                {pedido.tipoentrega === "R"
                                  ? "Á Retirar"
                                  : "Entregar"}
                              </td>
                            </tr>
                            <tr>
                              <th>Forma Pagamento:</th>
                              <td>
                                {pedido.tipopag === "D"
                                  ? "Cartão Débito/Crédito"
                                  : "Dinheiro"}
                              </td>
                            </tr>
                            <tr>
                              <th>Subtotal:</th>
                              <td>R${pedido.subtotal.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <th>Taxa Entrega:</th>
                              <td>R${pedido.taxaentrega.toFixed(2)}</td>
                            </tr>
                            <tr>
                              <th>Total:</th>
                              <td>
                                <strong>R${pedido.total.toFixed(2)}</strong>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))}
                    <p>&nbsp;</p>

                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th>Item</th>
                          <th>Quantidade</th>
                        </tr>

                        {itenspedido.length &&
                          itenspedido.map(itempedido => (
                            <tr>
                              <td>
                                {itempedido.item} ({itempedido.obs})
                              </td>
                              <td>{itempedido.qtde}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>

                    <div className="box-footer">
                      <button
                        className="btn btn-default"
                        onClick={() => history.push("/pedidos")}
                      >
                        Voltar
                      </button>
                    </div>

                    {loading && (
                      <div
                        style={{ alignItems: "center", textAlign: "center" }}
                      >
                        <img src={carregando} width="80"></img>
                      </div>
                    )}
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

      <Footer />
    </>
  );
}
