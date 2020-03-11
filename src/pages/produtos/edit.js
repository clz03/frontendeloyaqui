import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Destaque({ history }) {
  
    const [nome, setNome] = useState("");
    const [descr, setDescr] = useState("");
    const [preco, setPreco] = useState("");
    const [imagem, setImagem] = useState("");
    const [promocao, setPromocao] = useState("");
    //const [idestab, setIdestab] = useState("");
    const [loading, setLoading] = useState("");
   
    const url_string = window.location.href;
    const param = url_string.split("/");
  
    useEffect(() => {
      async function loadProd() {
  
        const response = await api.get('/produtos/'+param[4]);
        const data = await response.data;
  
        setNome(data[0].nome);
        setDescr(data[0].descr);
        setPreco(data[0].preco);
        setImagem(data[0].imagem);
        setPromocao(data[0].promocao);
        //setIdestab(data[0].idestabelecimento._id);
      }
      
      loadProd();
      document.getElementById('menu_produto').className = "active";
    },[]);
  
  
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          nome: nome, 
          descr: descr,
          preco: preco,
          imagem: imagem,
          promocao: promocao
          //idestab: idestab
        };
  
        await api.put('/produtos/'+param[4], dataobj)
        history.push('/produtos')
  
    }


  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {nome}
            <small>
              &nbsp;( {nome} )
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
                        htmlFor="nome"
                      >
                        Nome*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="nome"
                        placeholder="Nome do Produto"
                        className="form-control"
                        value={nome}
                        required
                        maxLength={40}
                        onChange={event => setNome(event.target.value)}
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
                        placeholder="Descrição do Produto"
                        className="form-control"
                        value={descr}
                        required
                        maxLength={100}
                        onChange={event => setDescr(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        Preço*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="preco"
                        placeholder="XX,XX"
                        className="form-control"
                        maxLength={10}
                        required
                        value={preco}
                        onChange={event => setPreco(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        URL da Imagem
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="imagem"
                        placeholder="URL da imagem do Estabelecimento"
                        className="form-control"
                        value={imagem}
                        maxLength={150}
                        onChange={event => setImagem(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Promoção
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="promocao"
                        placeholder="1=SIM / 0=NÃO"
                        className="form-control"
                        value={promocao}
                        maxLength={1}
                        onChange={event => setPromocao(event.target.value)}
                        />
                      </div>
                    </div>

                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      onClick={() => history.push("/produtos")}
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
