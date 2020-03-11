import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Cupom({ history }) {

    const [validade, setValidade] = useState("");
    const [premio, setPremio] = useState("");
    const [regra, setRegra] = useState("");
    const [expirado, setExpirado] = useState("");
    //const [idestab, setIdestab] = useState("");
    const [loading, setLoading] = useState("");
  
    const url_string = window.location.href;
    const param = url_string.split("/");
  
    
    useEffect(() => {
      async function loadCupom() {
  
        const response = await api.get('/cupons/'+param[4]);
        const data = await response.data;
  
        setValidade(data[0].validade.substring(8,10) + "/" + data[0].validade.substring(5,7) + "/" + data[0].validade.substring(0,4));
        setPremio(data[0].premio);
        setRegra(data[0].regra);
        setExpirado(data[0].expirado);
        //setIdestab(data[0].idestabelecimento._id);
      }
      
      loadCupom();
      document.getElementById('menu_cupons').className = "active";
    },[]);
  
  
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          validade: validade.substring(6,10) + "-" + validade.substring(3,5) + "-" + validade.substring(0,2), 
          premio: premio,
          regra: regra,
          //expirado: expirado
          //idestab: idestab
        };
  
        await api.put('/cupons/'+param[4], dataobj)
        history.push('/cupons')
  
    }


  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {premio}
            <small>
              &nbsp;( Cupom )
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
                        Validade*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="validade"
                        placeholder="DD/MM/AAAA"
                        className="form-control"
                        required
                        maxLength={10}
                        value={validade}
                        onChange={event => setValidade(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="descr"
                      >
                        Titulo Cupom*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="premio"
                        placeholder="Titulo do Cupom"
                        className="form-control"
                        required
                        maxLength={50}
                        value={premio}
                        onChange={event => setPremio(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        Regra Utilização*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="regra"
                        placeholder="Regra do Cupom"
                        className="form-control"
                        required
                        maxLength={80}
                        value={regra}
                        onChange={event => setRegra(event.target.value)}
                        />
                      </div>
                    </div>

                    {/* <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Expirado*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="expirado"
                        placeholder="1=SIM / 0=Não"
                        className="form-control"
                        maxLength={1}
                        value={expirado}
                        onChange={event => setExpirado(event.target.value)}
                        />
                      </div>
                    </div> */}

                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      onClick={() => history.push("/cupons")}
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
