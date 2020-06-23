import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

export default function Edit_Profissionais({ history }) {
  
    const [nome, setNome] = useState("");
    const [diasemana, setDiasemana] = useState([]);
    const [hrinicio, setHrinicio] = useState([]);
    const [hrfim, setHrfim] = useState([]);
    const [loading, setLoading] = useState("");
  
    const url_string = window.location.href;
    const param = url_string.split("/");

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
      { label: "20:00", value: "20" },
      { label: "21:00", value: "21" },
      { label: "22:00", value: "22" },
      { label: "23:00", value: "23" }
    ];
      

    async function loadProf() {
  
      const response = await api.get('/profissional/'+param[4]);
      const data = await response.data;

      setNome(data[0].nome);
      setHrinicio(data[0].hrinicio);
      setHrfim(data[0].hrfim);
      setDiasemana(data[0].diasemana);
    };

    async function handleSubmit(event) {
        
        event.preventDefault();
  
        const dataobj = { 
          nome: nome, 
          hrinicio: hrinicio,
          hrfim: hrfim,
          diasemana: diasemana
        };
  
        await api.put('/profissional/'+param[4], dataobj)
        history.push('/profissionais')
  
    };

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

    useEffect(() => {
      loadProf();
      //document.getElementById('menu_produto').className = "active";
    },[]);

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
                        placeholder="Nome do Profissional"
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
                        required
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
                        Horario Início*
                      </label>
                      <div className="col-sm-3">
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
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horario Fim*
                      </label>

                    <div className="col-sm-3">
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


                    
                  </div>

                  <div className="box-footer">
                  <button
                      className="btn btn-default"
                      onClick={() => history.push("/profissionais")}
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
