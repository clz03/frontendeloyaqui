import React, { useState, useEffect } from "react";
import "../../App.css";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
//import {connect,disconnect,subscribeToNewAgenda,} from "../../services/socket";
import Calendar from "react-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import InputMask from "react-input-mask";
import "./calendar.css";

export default function AgendaPublica({ history }) {
  const [loading, setLoading] = useState("");
  const [servicos, setServicos] = useState([]);
  const [estab, setEstab] = useState([]);
  const [servico, setServico] = useState("");
  const [profissionais, setProfissionais] = useState([]);
  const [profissional, setProfissional] = useState("1");
  const [horario, setHorario] = useState("");
  const [value, onChange] = useState(new Date());
  const [blackdates, setBlackdates] = useState([]);
  const [seldate, setSeldate] = useState("");
  const [maxdate, setMaxdate] = useState();
  const [evento, setEvento] = useState([]);
  const [progress, setProgress] = useState(10);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [etapa, setEtapa] = useState("1");

  const url_string = window.location.href;
  const param = url_string.split("/");
  let userestab = '';
  const estabIdentifier = param[4];

  async function loadEstab() {
    const query = "/estabelecimentos/identifier/" + estabIdentifier;
    const response = await api.get(query);
    const data = await response.data;
    if (data == null) {
       history.push('/');
    } else {
      userestab = data._id;
      setEstab(data);
      loadProfs();
    }
  }

  async function loadProfs() {
    const query = "/profissional/estabelecimento/" + userestab;
    const response = await api.get(query);
    const data = await response.data;
    setProfissionais(data);
    if(data.length === 1){
      setProfissional(data[0]._id);
    };
  }

  async function loadProf() {
    //console.log("aaa -> " + profissional);
    if (profissional === "1") {
      setProgress(10);
      //setProgressText("Inicie seu agendamento selecionando o profissional");
      setServicos([]);
      return;
    }

    const query = "/profissional/" + profissional;
    const response = await api.get(query);
    const data = await response.data;
    loadCalendar(data[0].diasemana);
    setProgress(25);
    //setProgressText("Selecione o serviço que deseja agendar");
  }

  async function loadServicos() {
    if (profissional === "1") return;
    const query = "/servicos/profissional/" + profissional;
    const response = await api.get(query);
    const data = await response.data;
    setServicos(data);
  }

  async function loadServico(id) {
    const query = "/servicos/" + id
    const response = await api.get(query);
    const data = await response.data;
    setServico(data);
  }

  async function loadEvento(date) {
    if (profissional === "1") return;
    const date2 =
      date.toISOString().substring(0, 4) +
      "-" +
      date.toISOString().substring(5, 7) +
      "-" +
      date.toISOString().substring(8, 10);
    const response = await api.get(
      "/eventos/dia/" + date2 + "/" + profissional
    );
    const data = await response.data;
    setEvento(data);
  }

  async function loadCalendar(semanadia) {
    var dias = semanadia;
    var arrFeriados = [];
    let datesBlacklist = [];
    var i = 0;
    var curDate;
    var curDay;
    var blackdat;

    const response = await api.get("/feriados");
    const data = await response.data;

    for (i = 0; i < data.length; i++) {
      arrFeriados.push(data[i].data.toString().substring(0, 10));
    }

    // Next 30 days
    for (let i = 0; i <= 30; ++i) {
      curDay = moment()
        .add(i, "days")
        .startOf("day")
        .toISOString()
        .substring(0, 10);
      curDate = moment().add(i, "days").day();

      if (arrFeriados.includes(curDay)) {
        blackdat = new Date(curDay + "T10:00:00");
        datesBlacklist.push(blackdat);
      } else if (!dias.includes(curDate.toString())) {
        blackdat = new Date(curDay + "T10:00:00");
        datesBlacklist.push(blackdat);
      }
    }

    var todayDate = new Date();
    todayDate.setDate(todayDate.getDate() + 30);

    setBlackdates(datesBlacklist);
    setMaxdate(todayDate);
  }

  async function handleSubmit(event) {
    var strTelefone;
    //event.preventDefault();

    //Buscar por telefone
    //Encontrado -> retorna id
    //Nao Encontrado -> Abre form para cadastro e retorna id
    //Realiza agendamento

    strTelefone = telefone.toString().replace(/[{()}]/g, "");
    strTelefone = strTelefone.toString().replace("-", "");
    strTelefone = strTelefone.toString().replace(" ", "");

    const response = await api.get("/usuarios/telefone/" + strTelefone);
    const data = await response.data;

    if (data) {
      if (window.confirm(data.nome + ", confirma seu agendamento ?")) {
        const dataobj = {
          data:
            seldate.toISOString().substring(0, 4) +
            "/" +
            seldate.toISOString().substring(5, 7) +
            "/" +
            seldate.toISOString().substring(8, 10),
          hora: horario,
          comentario: "teste automatico",
          idestabelecimento: userestab,
          idservico: servico,
          idprofissional: profissional,
          idusuario: data._id,
        };

        await api
          .post("/eventos/", dataobj)
          .then((res) => {
            if (res.status == 200) {
              //sucesso
            } else {
              //algum problema
            }
          })
          .catch((error) => {
            //erro
          });
      }
    } else {
      //Permite preencher Nome, Email e Senha e agenda
    }
  }

  function handleProfissional() {
    setProfissional("1");
    setSeldate("");
    setServico("");
    setHorario("");
  }

  function handleServico() {
    setServico("");
    setSeldate("");
    setHorario("");
    setProgress(25);
    //setProgressText("Selecione um serviço");
  }

  function handleCalendar() {
    setSeldate("");
    setHorario("");
    setProgress(50);
    //setProgressText("Selecione uma data");
  }

  function handleHorario(hora, status) {
    if (horario === "" && status === "D") {
      setHorario(hora);
      setProgress(100);
      //setProgressText("Informações completas, por favor confirme e agende");
    } else {
      setHorario("");
      setProgress(75);
      //setProgressText("Selecione um horário");
    }
  }

  useEffect(() => {
    setLoading(true);
    loadEstab();
    //loadProfs();
    document.getElementsByTagName("body")[0].style = "background-color:#ABABAB";
    //setupWebsocket(userestab);
    //subscribeToNewAgenda(status => loadEvento(1, true));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (seldate.toString() !== "") {
      setProgress(75);
      //setProgressText("Selecione um horário");
      loadEvento(seldate);
    }
  }, [seldate]);

  useEffect(() => {
    if (servico === "") {
      setProgress(25);
      //setProgressText("Selecione um serviço");
    } else {
      loadServico();
      setProgress(50);
      //setProgressText("Selecione um dia no calendario");
    }
  }, [servico]);

  useEffect(() => {
    loadProf();
    loadServicos();
    //loadEvento('2020-01-01');
    //loadCalendar();
  }, [profissional]);

  return (
    <div className="wrapper" style={{ backgroundColor: "#ABABAB" }}>
      <section className="content">
        <div className="col-md-12">
          <div className="box">
            <div className="box-header with-border text-center">
              <i className="fa fa-calendar" />
              <h3 className="box-title">&nbsp;{estab.nome}</h3>
              <p>
                (11) {estab.fone1}<br></br>{estab.rua}, {estab.numero} {!estab.complemento ? '' : '(' + estab.complemento + ')'}
              </p>

              {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

            </div>

            <div className="box-body">
              {/* <p>
                <code>{progressText}</code>
              </p> */}
              <div className="progress">
                <div
                  className="progress-bar progress-bar-primary progress-bar-striped"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  style={{ width: `${progress}%` }}
                >
                  {progress}% completo
                </div>
              </div>

              {profissional === "1" && (
                <div className="box box box-success box-solid">
                  <div className="box-header with-border">
                    <h3 className="box-title">Selecione o Profissional</h3>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <ul className="products-list product-list-in-box">

                      {profissionais.map((item) => (
                        <li className="item" key={item._id}>
                          <div>
                            <a
                              className="product-title"
                            >
                              {item.nome}
                              <span className="label pull-right">
                                <button className="btn btn-success" onClick={() => setProfissional(item._id)}>Selecionar</button>
                              </span>
                            </a>
                            <span className="product-description">
                              agenda disponível
                          </span>
                          </div>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
              )}

              {profissional !== "1" && (
                <div className="row">
                <div className="form-group">
                  <div className="col-md-12">
                    <strong>Profissional: </strong>
                    <span>
                      {profissionais[0].nome}{" "}
                      <button
                        style={{
                          backgroundColor: "#fff",
                          border: 0,
                          textDecoration: "underline",
                        }}
                        onClick={handleProfissional}
                      >
                        {" "}
                        alterar{" "}
                      </button>
                    </span>
                  </div>
                </div>
                </div>
              )}

              {profissional !== "1" && servico === "" && (
                <div className="box box box-success box-solid">
                  <div className="box-header with-border">
                    <h3 className="box-title">Agendar um Serviço</h3>
                  </div>
                  {/* /.box-header */}
                  <div className="box-body">
                    <ul className="products-list product-list-in-box">

                      {servicos.map((item) => (
                        <li className="item" key={item._id}>
                          <div>
                            <a
                              className="product-title"
                            >
                              {item.nome}
                              <span className="label pull-right">
                                <button className="btn btn-success" onClick={() => loadServico(item._id)}>Selecionar</button>
                              </span>
                            </a>
                            <span className="product-description">
                              R$ {item.preco}
                            </span>
                          </div>
                        </li>
                      ))}

                    </ul>
                  </div>
                </div>
              )}

              {profissional !== "1" && servico !== "" && (
                <div className="row">
                <div className="form-group">
                  <div className="col-md-12">
                    <strong>Serviço: </strong>
                    <span>
                      {servico[0].nome}{" "}
                      <button
                        style={{
                          backgroundColor: "#fff",
                          border: 0,
                          textDecoration: "underline",
                        }}
                        onClick={handleServico}
                      >
                        {" "}
                        alterar{" "}
                      </button>
                    </span>
                  </div>
                </div>
                </div>
              )}

              {profissional !== "1" &&
                servico !== "" &&
                seldate.toString() === "" && (

                  <div className="box box box-success box-solid">
                    <div className="box-header with-border">
                      <h3 className="box-title">Selecione o dia desejado</h3>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      <Calendar
                        onChange={onChange}
                        value={value}
                        maxDate={maxdate}
                        minDate={new Date()}
                        onClickDay={(value) => setSeldate(value)}
                        tileDisabled={({ date, view }) =>
                          view === "month" && // Block day tiles only
                          blackdates.some(
                            (disabledDate) =>
                              date.getFullYear() ===
                              disabledDate.getFullYear() &&
                              date.getMonth() === disabledDate.getMonth() &&
                              date.getDate() === disabledDate.getDate()
                          )
                        }
                      />
                    </div>
                  </div>




                )}

              {profissional !== "1" &&
                servico !== "" &&
                seldate.toString() !== "" && (
                  <div className="row">
                  <div className="form-group">
                    <div className="col-md-12">
                      <strong>Data: </strong>
                      <span>
                        {seldate.toISOString().substring(8, 10) +
                          "/" +
                          seldate.toISOString().substring(5, 7) +
                          "/" +
                          seldate.toISOString().substring(0, 4)}{" "}
                        <button
                          style={{
                            backgroundColor: "#fff",
                            border: 0,
                            textDecoration: "underline",
                          }}
                          onClick={handleCalendar}
                        >
                          {" "}
                          alterar{" "}
                        </button>
                      </span>
                    </div>
                  </div>
                  </div>
                )}

              {profissional !== "1" &&
                servico !== "" &&
                seldate.toString() !== "" &&
                horario === "" && (

                  <div className="box box box-success box-solid">
                    <div className="box-header with-border">
                      <h3 className="box-title">Selecione o horário</h3>
                    </div>
                    {/* /.box-header */}
                    <div className="box-body">
                      {evento.map((evento) => (
                        <a
                          onClick={() => handleHorario(evento.hora, evento.status)}
                          style={{ cursor: "pointer" }}
                          key={evento.hora}
                        >
                          <div className="col-md-2 col-sm-4 col-xs-6">
                            <div
                              className={`info-box ${
                                evento.status === "D" ? "bg-green" : "bg-red"
                                }`}
                              style={{ minHeight: 45 }}
                            >
                              <div
                                className="info-box-content"
                                style={{ marginLeft: 0 }}
                              >
                                <span className="info-box-number">
                                  {evento.hora.toString().indexOf(".5") > -1
                                    ? evento.hora.toString().replace(".5", "") +
                                    ":30"
                                    : evento.hora + ":00"}
                                </span>
                              </div>
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                )}

              {profissional !== "1" &&
                servico !== "" &&
                seldate.toString() !== "" &&
                horario !== "" && (
                  <div className="row">
                  
                    <div className="form-group">
                      <div className="col-md-12">
                        <strong>Horário: </strong>
                        <span>
                          {
                            horario.toString().indexOf(".5") > -1
                              ? horario.toString().replace(".5", "") +
                              ":30"
                            : horario + ":00"
                          }{" "}
                          <button
                            style={{
                              backgroundColor: "#fff",
                              border: 0,
                              textDecoration: "underline",
                            }}
                            onClick={() => handleHorario("")}
                          >
                            {" "}
                            alterar{" "}
                          </button>
                        </span>
                      </div>
                    </div>

                    <div className="form-group" style={{ paddingBottom: 10 }}>
                      <div className="col-md-12">
                        <button
                          type="button"
                          className="btn btn-success"
                          data-toggle="modal"
                          data-target="#modal-default"
                        >
                          Agendar
                        </button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
          </div>
        </div>

        <div className="row" style={{ backgroundColor: "#ABABAB" }}>
          <p>&nbsp;</p>
        </div>
      </section>

      <div
        className="modal fade"
        id="modal-default"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
              <h4 className="modal-title">Identifique-se para finalizar</h4>
            </div>
            <div className="modal-body">
              <form className="form-horizontal">
                <div className="box-body">

                  
                    
                      <div className="form-group">
                        <label
                          htmlFor="inputTel3"
                          className="col-sm-2 control-label"
                        >
                          Nome
                     </label>
                        <div className="col-sm-10">
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-user"></i>
                            </div>

                            <input
                              type="text"
                              className="form-control"
                              id="inputNome"
                              placeholder="Seu Nome"
                              required
                              value={nome}
                              onChange={(event) =>
                                setNome(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="inputTel3"
                          className="col-sm-2 control-label"
                        >
                          Celular
                      </label>
                        <div className="col-sm-10">
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-phone"></i>
                            </div>

                            <InputMask
                              type="text"
                              className="form-control"
                              id="inputTel3"
                              placeholder="(11) 99999-9999"
                              required
                              mask="(99) 99999-9999"
                              value={telefone}
                              onChange={(event) =>
                                setTelefone(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>

                      <div className="form-group">
                        <label
                          htmlFor="inputTel3"
                          className="col-sm-2 control-label"
                        >
                          E-mail
                     </label>
                        <div className="col-sm-10">
                          <div className="input-group">
                            <div className="input-group-addon">
                              <i className="fa fa-envelope"></i>
                            </div>

                            <input
                              type="text"
                              className="form-control"
                              id="inputEmail"
                              placeholder="seuemail@nome.com.br"
                              required
                              value={email}
                              onChange={(event) =>
                                setEmail(event.target.value)
                              }
                            />
                          </div>
                        </div>
                      </div>
                  

                  <h3>Resumo:</h3>

                  <div className="form-group" style={{ marginBottom: 5 }}>
                    <div className="col-md-12">
                      <strong>Estabelecimento: </strong>
                      <span>Barbearia do Rody</span>
                    </div>
                  </div>

                  {profissionais.length > 0 && (
                    <div className="form-group" style={{ marginBottom: 5 }}>
                      <div className="col-md-12">
                        <strong>Profissional: </strong>
                        <span>{profissionais[0].nome}</span>
                      </div>
                    </div>
                  )}

                  {servicos.length > 0 && (
                    <div className="form-group" style={{ marginBottom: 5 }}>
                      <div className="col-md-12">
                        <strong>Serviço: </strong>
                        <span>{servicos[0].nome}</span>
                      </div>
                    </div>
                  )}

                  {seldate && horario && (
                    <div className="form-group" style={{ marginBottom: 5 }}>
                      <div className="col-md-12">
                        <strong>Data: </strong>
                        <span>
                          {seldate.toISOString().substring(8, 10) +
                            "/" +
                            seldate.toISOString().substring(5, 7) +
                            "/" +
                            seldate.toISOString().substring(0, 4)}{" "}
                          as {horario}
                        </span>
                      </div>
                    </div>
                  )}

                {servicos.length > 0 && (
                    <div className="form-group" style={{ marginBottom: 5 }}>
                      <div className="col-md-12">
                        <strong>Valor: </strong>
                        <span>R$ {servicos[0].preco} (pagamento no local)</span>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default pull-left"
                data-dismiss="modal"
              >
                Voltar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleSubmit()}
              >
                Agendar
              </button>
            </div>
          </div>
          {/* /.modal-content */}
        </div>
        {/* /.modal-dialog */}
      </div>

      <footer className="footer">
        <strong style={{marginLeft:30}}>EloyAqui © 2020</strong>
      </footer>



    </div>
  );
}
