import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Servicos({ history }) {
  
  const [nome, setNome] = useState("");
  const [descr, setDescr] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [diasemana, setDiasemana] = useState([]);
  const [hrinicio, setHrinicio] = useState([]);
  const [hrfim, setHrfim] = useState([]);
  const [promocao, setPromocao] = useState("");
  //const [idestab, setIdestab] = useState("");
  const [loading, setLoading] = useState("");

  const userestab = localStorage.getItem('eloyuserestab');

  const diasdaSemana = [
    { label: "Domingo", value: "0" },
    { label: "Segunda-Feira", value: "1" },
    { label: "Terça-Feira", value: "2" },
    { label: "Quarta-Feira", value: "3" },
    { label: "Quinta-Feira", value: "4" },
    { label: "Sexta-Feira", value: "5" },
    { label: "Sábado", value: "6" }
  ];

  const horarios = [
    { label: "06:00", value: "6" },
    { label: "07:00", value: "7" },
    { label: "08:00", value: "8" },
    { label: "09:00", value: "9" },
    { label: "10:00", value: "10" },
    { label: "11:00", value: "11" },
    { label: "12:00", value: "12" },
    { label: "13:00", value: "13" },
    { label: "14:00", value: "14" },
    { label: "15:00", value: "15" },
    { label: "16:00", value: "16" },
    { label: "17:00", value: "17" },
    { label: "18:00", value: "18" },
    { label: "19:00", value: "19" },
    { label: "21:00", value: "21" },
    { label: "22:00", value: "22" },
    { label: "23:00", value: "23" }
  ];
  

  function handleSelectMulti(event){
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setDiasemana(value);
  }

  
    const url_string = window.location.href;
    const param = url_string.split("/");
  
    useEffect(() => {
      async function loadProd() {
  
        const response = await api.get('/servicos/'+param[4]);
        const data = await response.data;
  
        setNome(data[0].nome);
        setDescr(data[0].descr);
        setPreco(data[0].preco);
        setImagem(data[0].imagem);
        setPromocao(data[0].promocao);
        setDiasemana(data[0].diasemana);
        setHrinicio(data[0].hrinicio);
        setHrfim(data[0].hrfim);
        //setIdestab(data[0].idestabelecimento._id);
      }
      
      loadProd();
    },[]);
  
  
    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          nome: nome, 
          descr: descr,
          preco: preco,
          diasemana: diasemana,
          hrinicio: hrinicio,
          hrfim: hrfim,
          imagem: imagem,
          promocao: promocao,
          //idestab: idestab
        };
  
        await api.put('/servicos/'+param[4], dataobj)
        history.push('/servicos')
  
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
                        placeholder="Nome do Serviço"
                        className="form-control"
                        value={nome}
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
                        placeholder="Descrição do Serviço"
                        className="form-control"
                        value={descr}
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
                        maxLength={20}
                        value={preco}
                        onChange={event => setPreco(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="preco"
                      >
                        Dias da Semana*
                      </label>
                      <div className="col-sm-10">
                      
                      <select
                        id="idcategoria"
                        multiple="multiple"
                        style={{height:'130px', width:'150px'}}
                        value={diasemana}
                        className="select1"
                        onChange={handleSelectMulti}
                    >
                        {diasdaSemana.map((dia) =>
                            <option key={dia.value} value={dia.value}>{dia.label}</option>
                        )}
                    </select>

                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horario Início / Fim*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrinicio"
                          value={hrinicio}
                          className="form-control select2"
                          onChange={event =>
                            setHrinicio(event.target.value)
                          }
                        >
                          {horarios.map(horarios_inicio => (
                            <option
                              key={horarios_inicio.value}
                              value={horarios_inicio.value}
                            >
                              {horarios_inicio.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-sm-4">
                        <select
                          id="hrfim"
                          value={hrfim}
                          className="form-control select2"
                          onChange={event =>
                            setHrfim(event.target.value)
                          }
                        >
                          {horarios.map(horarios_fim => (
                            <option
                              key={horarios_fim.value}
                              value={horarios_fim.value}
                            >
                              {horarios_fim.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        URL da Imagem*
                      </label>
                      <div className="col-sm-10">
                      <input
                        id="imagem"
                        placeholder="URL da imagem"
                        className="form-control"
                        value={imagem}
                        maxLength={100}
                        onChange={event => setImagem(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Promoção*
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
                      onClick={() => history.push("/servicos")}
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
