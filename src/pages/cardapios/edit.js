import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Cardapio({ history }) {

  const [categoria, setCategoria] = useState("");
  const [item, setItem] = useState('');
  const [descr, setDescr] = useState('');
  const [valor, setValor] = useState('');
  const [tseg, setTseg] = useState('');
  const [tter, setTter] = useState('');
  const [tqua, setTqua] = useState('');
  const [tqui, setTqui] = useState('');
  const [tsex, setTsex] = useState('');
  const [tsab, setTsab] = useState('');
  const [tdom, setTdom] = useState('');
  const [tmeia, setTmeia] = useState('');
  const [compl1, setCompl1] = useState('');
  const [compl2, setCompl2] = useState('');
  const [compl3, setCompl3] = useState('');
  const [adit1, setAdit1] = useState('');
  const [adit2, setAdit2] = useState('');
  const [adit3, setAdit3] = useState('');
  const [loading, setLoading] = useState('');

  const url_string = window.location.href;
  const param = url_string.split("/");

  useEffect(() => {
    async function loadCardapio() {

      setLoading(true);
      const response = await api.get('/cardapios/'+param[4]);
      const data = await response.data;

      setCategoria(data[0].categoria);
      setItem(data[0].item);
      setDescr(data[0].descr);
      setValor(data[0].valor);

      setTseg(data[0].tseg);
      setTter(data[0].tter);
      setTqua(data[0].tqua);
      setTqui(data[0].tqui);
      setTsex(data[0].tsex);
      setTsab(data[0].tsab);
      setTdom(data[0].tdom);

      setTmeia(data[0].tmeia);

      setCompl1(data[0].compl1);
      setCompl2(data[0].compl2);
      setCompl3(data[0].compl3);

      try {
        setTimeout(() => {
          document.getElementById('menu_cardapio').className = "active";
        }, 2000);  
      } catch (error) { 
      }
      setLoading(false);
    };

    
    loadCardapio();
    
  },[]);

  async function handleSubmit(event) {
        
    event.preventDefault();
    setLoading(true);

    const dataobj = { 
      categoria: categoria,
      item: item,
      descr: descr,
      valor: valor,
      tseg: tseg,
      tter: tter,
      tqua: tqua,
      tqui: tqui,
      tsex: tsex,
      tsab: tsab,
      tdom: tdom,
      tmeia: tmeia,
      compl1: compl1,
      compl2: compl2,
      compl3: compl3
      //idestabelecimento: userestab
    };

    await api.put('/cardapios/'+param[4], dataobj);
    history.push('/cardapios');
    setLoading(false);
  }

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>Novo Item no Cardápio</h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">

              <div className="col-md-12">
                <div className="nav-tabs-custom">
                  <ul className="nav nav-tabs">
                    <li className="active">
                      <a href="#info" data-toggle="tab">
                        Informações
                      </a>
                    </li>
                    <li>
                      <a href="#disp" data-toggle="tab">
                        Disponibilidade
                      </a>
                    </li>
                    <li>
                      <a href="#compl" data-toggle="tab">
                        Opções do Prato
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="active tab-pane" id="info">
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="box-body">
                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="nome"
                            >
                              Categoria*
                            </label>
                            <div className="col-sm-10">
                              <input
                                id="categoria"
                                placeholder="ex: Pratos Executivos"
                                className="form-control"
                                value={categoria}
                                onChange={event =>
                                  setCategoria(event.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="descr"
                            >
                              Nome*
                            </label>
                            <div className="col-sm-10">
                              <input
                                id="item"
                                placeholder="ex: Parmegiana de Frango"
                                className="form-control"
                                required
                                maxLength={60}
                                value={item}
                                onChange={event => setItem(event.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="descr"
                            >
                              Descrição*
                            </label>
                            <div className="col-sm-10">
                              <input
                                id="descr"
                                placeholder="ex: Arroz, Feijão, Bife e batata"
                                className="form-control"
                                required
                                maxLength={150}
                                value={descr}
                                onChange={event => setDescr(event.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="preco"
                            >
                              Valor*
                            </label>
                            <div className="col-sm-10">
                              <input
                                id="valor"
                                placeholder="ex: 39,90"
                                className="form-control"
                                required
                                maxLength={10}
                                value={valor}
                                onChange={event => setValor(event.target.value)}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="box-footer">
                          <button
                            className="btn btn-default"
                            onClick={() => history.push("/cardapios")}
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            className="btn btn-info pull-right"
                          >
                            Salvar
                          </button>
                        </div>

                        {loading && (
                          <div
                            style={{
                              alignItems: "center",
                              textAlign: "center"
                            }}
                          >
                            <img src={carregando} width="80"></img>
                          </div>
                        )}
                      </form>
                    </div>
                    {/* /.tab-pane */}
                    <div className="tab-pane" id="disp">
                    <form className="form-horizontal" onSubmit={handleSubmit}>
                      <div className="box-body">
                        <div className="form-group">
                          <label
                            className="col-sm-2 control-label"
                            htmlFor="preco"
                          >
                            Dias da Semana*
                          </label>
                          <div className="col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tseg"
                                  type="checkbox"
                                  checked={tseg === true ? "checked" : ""}
                                  onChange={event => {
                                    setTseg(!tseg);
                                  }}
                                />
                                Segunda
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tter"
                                  type="checkbox"
                                  checked={tter === true ? "checked" : ""}
                                  onChange={event => {
                                    setTter(!tter);
                                  }}
                                />
                                Terça
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tqua"
                                  type="checkbox"
                                  checked={tqua === true ? "checked" : ""}
                                  onChange={event => {
                                    setTqua(!tqua);
                                  }}
                                />
                                Quarta
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tqui"
                                  type="checkbox"
                                  checked={tqui === true ? "checked" : ""}
                                  onChange={event => {
                                    setTqui(!tqui);
                                  }}
                                />
                                Quinta
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tsex"
                                  type="checkbox"
                                  checked={tsex === true ? "checked" : ""}
                                  onChange={event => {
                                    setTsex(!tsex);
                                  }}
                                />
                                Sexta
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tsab"
                                  type="checkbox"
                                  checked={tsab === true ? "checked" : ""}
                                  onChange={event => {
                                    setTsab(!tsab);
                                  }}
                                />
                                Sabádo
                              </label>
                            </div>
                          </div>
                          <div className="col-sm-offset-2 col-sm-10">
                            <div className="checkbox">
                              <label>
                                <input
                                  id="tdom"
                                  type="checkbox"
                                  checked={tdom === true ? "checked" : ""}
                                  onChange={event => {
                                    setTdom(!tdom);
                                  }}
                                />
                                Domingo
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="box-footer">
                          <button
                            className="btn btn-default"
                            onClick={() => history.push("/cardapios")}
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            className="btn btn-info pull-right"
                          >
                            Salvar
                          </button>
                        </div>
                      </form>
                    
                    </div>
                    {/* /.tab-pane */}
                    <div className="tab-pane" id="compl">
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="box-body">
                          

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="nome"
                            >
                              Opção 1
                            </label>
                            <div className="col-sm-4">
                              <input
                                id="compl1"
                                placeholder="ex: Batata"
                                className="form-control"
                                value={compl1}
                                onChange={event =>
                                  setCompl1(event.target.value)
                                }
                              />
                            </div>

                            <label
                              className="col-sm-2 control-label"
                              htmlFor="adit1"
                            >
                              $ Adicional
                            </label>
                            <div className="col-sm-4">
                              <input
                                id="adit1"
                                placeholder="ex: 3,00"
                                className="form-control"
                                value={adit1}
                                onChange={event =>
                                  setAdit1(event.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="nome"
                            >
                              Opção 2
                            </label>
                            <div className="col-sm-4">
                              <input
                                id="compl2"
                                placeholder="ex: Polenta"
                                className="form-control"
                                value={compl2}
                                onChange={event =>
                                  setCompl2(event.target.value)
                                }
                              />
                            </div>

                            <label
                              className="col-sm-2 control-label"
                              htmlFor="adit2"
                            >
                              $ Adicional
                            </label>
                            <div className="col-sm-4">
                              <input
                                id="adit2"
                                placeholder="ex: 3,00"
                                className="form-control"
                                value={adit2}
                                onChange={event =>
                                  setAdit2(event.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="nome"
                            >
                              Opção 3
                            </label>
                            <div className="col-sm-4">
                              <input
                                id="compl3"
                                placeholder="ex: Salada"
                                className="form-control"
                                value={compl3}
                                onChange={event =>
                                  setCompl3(event.target.value)
                                }
                              />
                            </div>

                            <label
                              className="col-sm-2 control-label"
                              htmlFor="adit3"
                            >
                              $ Adicional
                            </label>
                            <div className="col-sm-4">
                              <input
                                id="adit3"
                                placeholder="ex: 3,00"
                                className="form-control"
                                value={adit3}
                                onChange={event =>
                                  setAdit3(event.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <label
                              className="col-sm-2 control-label"
                              htmlFor="nome"
                            >
                              Pizza
                            </label>
                            <div className="col-sm-10">
                              <div className="checkbox">
                                <label>
                                  <input
                                    id="tmeia"
                                    type="checkbox"
                                    checked={tmeia === true ? "checked" : ""}
                                    onChange={event => {
                                      setTmeia(!tmeia);
                                    }}
                                  />
                                  Habilitar Meia
                                </label>
                              </div>
                            </div>
                          </div>

                          <small>
                            * O cliente poderá escolhar somente uma opção
                          </small>
                          <br></br>
                          <small>
                            * Selecione a opção "Habilitar Meia" para permitir que seu cliente faça pedidos meio a meio (Pizza)
                          </small>
                        </div>
                        <div className="box-footer">
                          <button
                            className="btn btn-default"
                            onClick={() => history.push("/cardapios")}
                          >
                            Voltar
                          </button>
                          <button
                            type="submit"
                            className="btn btn-info pull-right"
                          >
                            Salvar
                          </button>
                        </div>
                      </form>
                    </div>
                    {/* /.tab-pane */}
                  </div>
                  {/* /.tab-content */}
                </div>
                {/* /.nav-tabs-custom */}
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
