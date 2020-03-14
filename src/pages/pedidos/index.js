import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";
import { connect, disconnect, subscribeToNewPed } from "../../services/socket";

export default function List_Pedidos({ history }) {
  const [pedido, setPedido] = useState([]);
  const [loading, setLoading] = useState("");
  const [filtro, setFiltro] = useState(0);
  const [msgvazio, setMsgvazio] = useState("carregando...");
  const [online, setOnline] = useState(true);

  const userestab = localStorage.getItem("eloyuserestab");

  const statusArr = [
    { label: "Pedido enviado ao restaurante", value: "1" },
    { label: "Pedido em preparação e sairá para entrega em breve", value: "2" },
    {label: "Pedido em preparação e estará pronto para retirada em breve", value: "3" },
    { label: "Pedido saiu para entrega", value: "4" },
    { label: "Pedido pronto para ser retirado", value: "5" },
    { label: "Pedido cancelado", value: "6" },
    { label: "Pedido entregue", value: "7" }
  ];

  async function loadPedido(tocasom) {
    var query;

    if(filtro == 0){
      query = "/pedidos/estabelecimento/hoje/" + userestab
    } else {
      query = "/pedidos/estabelecimento/" + userestab
    };

    const response = await api.get(query);
    const data = await response.data;

    setPedido(data);
    setLoading(false);
    if (tocasom) playsound();
  }

  function playsound() {
    var audio = new Audio("/dist/audio/notifica.mp3");
    audio.play();
  }

  function setupWebsocket(idestab) {
    disconnect();
    connect(idestab, 0);
  }

  function handleFiltro(event) {
    setFiltro(event.target.value);
  }

  useEffect(() => {
    setLoading(true);
    loadPedido(true);
    setMsgvazio("Nenhum pedido encontrado");
    setupWebsocket(userestab);
    subscribeToNewPed(status => loadPedido(true));
    setOnline(localStorage.getItem("eloyuserestabonline"));
    try {
      setTimeout(() => {
        document.getElementById("menu_pedidos").className = "active";
      }, 1000);
    } catch (error) {}
  }, []);

  useEffect(() => {
    loadPedido(false);
  }, [filtro]);

  return (
    <>
      <Header />
      <SideMenu />

      <div>
        <div className="content-wrapper">
          <section className="content-header">
            <h1>
              Pedidos
              {online == "true" && (
                <small>
                  <img src="/dist/img/active.gif"></img>
                </small>
              )}
            </h1>
          </section>

          <section className="content">
            <div className="row">
              <div className="col-md-12">
                <div className="box box-info">
                  <form className="form-horizontal">
                    <div className="box-body">
                    <div className="form-group">
                    <label className="col-sm-2 control-label" htmlFor="meses">
                      Filtro:
                    </label>
                    <div className="col-sm-4">
                      <select
                        id="escolha"
                        className="select4"
                        value={filtro}
                        className="form-control"
                        onChange={handleFiltro}
                      >
                        <option key={0} value={0}>
                          Pedidos de Hoje
                        </option>
                        <option key={1} value={1}>
                          Todos os pedidos
                        </option>
                      </select>
                    </div>
                  </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xs-12">
                <div className="box">
                 

                  <div className="box-body table-responsive">
                    {/* <a class="btn btn-app">
                              <i class="fa fa-edit"></i> Cancelar Selecionado
                            </a> */}

                    <table className="table table-hover">
                      <tbody>
                        <tr>
                          <th>Pedido</th>
                          <th>Data/Hora</th>
                          <th>Status</th>
                          <th>Tipo</th>
                          <th>Cliente</th>
                          <th>Endereco</th>
                        </tr>
                        {pedido.length
                          ? pedido.map(pedido => (
                              <tr>
                                <td>
                                  <a href={"/pedido/" + pedido._id}>
                                    #{pedido.seq}
                                  </a>
                                </td>
                                <td>
                                  {pedido.data.substring(8, 10) +
                                    "/" +
                                    pedido.data.substring(5, 7) +
                                    "/" +
                                    pedido.data.substring(0, 4) +
                                    " - " +
                                    pedido.data.substring(11, 16)}
                                </td>
                                <td>
                                  {statusArr.map(statusArr =>
                                    // if
                                    statusArr.value === pedido.status ? (
                                      // if
                                      statusArr.value < 6 ? (
                                        <span
                                          key={statusArr.value}
                                          className="label label-warning"
                                        >
                                          {statusArr.label}
                                        </span>
                                      ) : // if
                                      statusArr.value == 7 ? (
                                        <span
                                          key={statusArr.value}
                                          className="label label-success"
                                        >
                                          {statusArr.label}
                                        </span>
                                      ) : //else
                                      statusArr.value == 6 ? (
                                        <span
                                          key={statusArr.value}
                                          className="label label-danger"
                                        >
                                          {statusArr.label}
                                        </span>
                                      ) : (
                                        //else
                                        ""
                                      )
                                    ) : (
                                      //else
                                      ""
                                    )
                                  )}
                                </td>
                                <td>
                                  {pedido.tipoentrega === "E"
                                    ? "Entrega"
                                    : "Retira"}
                                </td>
                                <td>Joao</td>
                                <td>
                                  {pedido.tipoentrega === "E"
                                    ? pedido.rua + ", " + pedido.numero
                                    : "-"}
                                </td>
                              </tr>
                            ))
                          : "Nenhum pedido encontrado"}
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

      <Footer />
    </>
  );
}
