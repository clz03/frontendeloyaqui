import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Cardapio({ history }) {

  const [categoria, setCategoria] = useState("");
  const [item, setItem] = useState("");
  const [descr, setDescr] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState("");

  const url_string = window.location.href;
  const param = url_string.split("/");

  useEffect(() => {
    async function loadCardapio() {

      const response = await api.get('/cardapios/'+param[4]);
      const data = await response.data;

      setCategoria(data[0].categoria);
      setItem(data[0].item);
      setDescr(data[0].descr);
      setValor(data[0].valor);
    };

    loadCardapio();
  },[]);

  async function handleSubmit(event) {
        
    event.preventDefault();

    const dataobj = { 
      categoria: categoria, 
      item: item,
      descr: descr,
      valor: valor
      //idestabelecimento: idestabelecimento
    };

    await api.put('/cardapios/'+param[4], dataobj)
    history.push('/cardapios')

  }

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {item}
            <small>
              &nbsp;({categoria})
            </small>
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
                {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">
                  
                  <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="descr"
                      >
                        Item*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="item"
                        placeholder="ex: Parmegiana de Frango"
                        className="form-control"
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
                        value={descr}
                        onChange={event => setDescr(event.target.value)}
                      />
                      </div>
                    </div>

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
                        onChange={event => setCategoria(event.target.value)}
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
                        placeholder="39,90"
                        className="form-control"
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
                    <button type="submit" className="btn btn-info pull-right">
                      Salvar
                    </button>
                  </div>

                  {loading && (
                    <div style={{ alignItems: "center", textAlign: "center" }}>
                      <img src={carregando} width="80"></img>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>

   
  );
}
