import React, { useState, useEffect } from "react";
import "../../App.css";
//import carregando from "../../assets/loading.gif";
import api from "../../services/api";
//import {connect,disconnect,subscribeToNewAgenda,} from "../../services/socket";
import Calendar from "react-calendar";
import moment from "moment";
import "moment/locale/pt-br";
import "./calendar.css";

export default function AgendaPublica() {
  const [loading, setLoading] = useState("");
  const [servicos, setServicos] = useState([]);
  const [servico, setServico] = useState('');
  const [profissionais, setProfissionais] = useState([]);
  const [profissional, setProfissional] = useState("1");
  const [value, onChange] = useState(new Date());
  const [blackdates, setBlackdates] = useState([]);
  const [seldate, setSeldate] = useState('');
  const [maxdate, setMaxdate] = useState();
  const [diasSemana, setDiasSemana] = useState([]);
  const [evento, setEvento] = useState([]);
  const [progress, setProgress] = useState(10);
  const [progressText, setProgressText] = useState("Inicie seu agendamento selecionando o profissional")

  const url_string = window.location.href;
  const param = url_string.split("/");
  const userestab = param[4];

  async function loadProfs() {
    const query = "/profissional/estabelecimento/" + userestab;
    const response = await api.get(query);
    const data = await response.data;
    setProfissionais(data);
  };

  async function loadProf() {
    //console.log("aaa -> " + profissional);
    if (profissional === '1') {
      setProgress(10);
      setProgressText("Inicie seu agendamento selecionando o profissional");
      setServicos([]);
      return;
    }

    const query = "/profissional/" + profissional;
    const response = await api.get(query);
    const data = await response.data;
    setDiasSemana(data[0].diasemana);
    loadCalendar(data[0].diasemana);
    setProgress(25);
    setProgressText("Selecione o serviço que deseja agendar");
  };

  async function loadServicos() {
    if (profissional === '1') return;
    const query = "/servicos/profissional/" + profissional;
    const response = await api.get(query);
    const data = await response.data;
    setServicos(data);
  };

  async function loadEvento(date) {
    if (profissional === '1') return;
    const query = "/eventos/dia/" + date + "/" + profissional;
    const response = await api.get(query);
    const data = await response.data;
    setEvento(data);
  };

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
  };

  async function handleSubmit(event) {

    event.preventDefault();

    const dataobj = {
      data: seldate,
      hora: 3,
      comentario: '',
      idestabelecimento: userestab,
      idservico: servico,
      idusuario: ''
    };

    await api.post('/servicos/', dataobj)

  };

  function handleCalendar() {
    setSeldate(undefined);
  };

  useEffect(() => {
    setLoading(true);
    loadProfs();
    setLoading(false);

    //setupWebsocket(userestab);
    //subscribeToNewAgenda(status => loadEvento(1, true));
  }, []);

  useEffect(() => {
    loadProf();
    loadServicos();
    loadEvento('2020-01-01');
    //loadCalendar();
  }, [profissional]);


  return (
    <div className="wrapper" style={{ backgroundColor: "#ecf0f5" }}>
      {/* <section className="content-header">
          <h1>
            Agende Aqui<small>( Barbearia do Rody )</small>
          </h1>
        </section> */}

      <section className="content">
        <div className="row">

          <div className="col-md-12">
            {/* Widget: user widget style 1 */}
            <div className="box box-widget widget-user">
              {/* Add the bg color to the header using any of the bg-* classes */}
              <div className="widget-user-header bg-aqua-active">
                <h3 className="widget-user-username">Barbearia do Rody</h3>
                <h5 className="widget-user-desc">Agendamento online</h5>
              </div>
              <div className="widget-user-image">
                <img className="img-circle" src="../dist/img/user1-128x128.jpg" alt="User Avatar" />
              </div>

              <div className="box-footer">
                <div className="row">
                  <div className="col-sm-12 border-right">
                    <div className="description-block">
                

                      <p><code>{progressText}</code></p>
                      <div className="progress">
                        <div className="progress-bar progress-bar-primary progress-bar-striped" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} style={{ width: `${progress}%` }}>
                          {progress}% completo
                          </div>
                      </div>



                    </div>
                    {/* /.description-block */}
                  </div>


                </div>
                {/* /.row */}
              </div>

              <div className="box-body">
                <div className="row">
                  <div className="col-sm-12 border-right">
                    Profissional: {profissional} <a onClick={handleCalendar}>(alterar)</a>
                  </div>
                  <div className="col-sm-12 border-right">
                    Serviço: {servico} <a onClick={handleCalendar}>(alterar)</a>
                  </div>
                  <div className="col-sm-12 border-right">
                    Data: {seldate.toString().substring(8,10) + "/" + seldate.toString().substring(5,7) + "/" + seldate.toString().substring(0,4)} <a onClick={handleCalendar}>(alterar)</a>
                  </div>
                  <div className="col-sm-12 border-right">
                    Horário: 09:30 AM <a onClick={handleCalendar}>(alterar)</a>
                  </div>

                </div>
                {/* /.row */}
              </div>
            
            </div>
            {/* /.widget-user */}
          </div>
        </div>



        <div className="row">

          {profissional === "1" &&
          <div className="box-body">
            <div className="form-group">
              <label
                className="col-sm-2 control-label"
                htmlFor="idcategoria"
              >
                Profissional*
                  </label>
              <div className="col-sm-4">
                <select
                  id="profissional"
                  value={profissional}
                  className="form-control select2"
                  onChange={(event) => setProfissional(event.target.value)}
                >
                  <option key={"1"} value={"1"}>
                    {"Selecione Aqui"}
                  </option>
                  {profissionais.map((item) => (
                    <option key={item._id} value={item._id}>
                      {item.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        }

        {servicos.length > 0 && servico === '' &&
          <div className="box-body">
              <div className="form-group">
                <label
                  className="col-sm-2 control-label"
                  htmlFor="idcategoria"
                >
                  Serviço*
                  </label>
                <div className="col-sm-4">
                  <select
                    id="servicos"
                    value={servico}
                    className="form-control select2"
                    onChange={(event) => setServico(event.target.value)}
                  >
                    <option key={''} value={''}>
                      {"Selecione Aqui"}
                    </option>
                    {servicos.map((item) => (
                      <option key={item._id} value={item._id}>
                        {item.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            }

          {/* <div className="box-body">
                {servicos.length
                      ? servicos.map((servico) => (
                      <a className="btn" id={servico._id} key={servico._id} onClick={() => handleSelectItem(servico._id)}>{servico.nome}</a>
                      ))
                : msgvazio}
              </div> */}



          {profissional !== '1' &&
            servico !== '' &&
            seldate === '' &&
            <div className="col-xs-12 center-block text-center">
              <Calendar
                onChange={onChange}
                value={value}
                maxDate={maxdate}
                minDate={new Date()}
                locale="PT-BR"
                onClickDay={(value) => setSeldate(value)}
                tileDisabled={({ date, view }) =>
                  view === "month" && // Block day tiles only
                  blackdates.some(
                    (disabledDate) =>
                      date.getFullYear() === disabledDate.getFullYear() &&
                      date.getMonth() === disabledDate.getMonth() &&
                      date.getDate() === disabledDate.getDate()
                  )
                }
              />
            </div>
          }

          {profissional !== '1' &&
            seldate !== '' &&
            <>

              <div className="col-md-3 col-sm-6 col-xs-12 center-block text-center">
                <div className="info-box bg-aqua">


                  <span className="info-box-text">Bookmarks</span>
                  <span className="info-box-number">41,410</span>
                  <div className="progress">
                    <div className="progress-bar" style={{ width: '70%' }} />
                  </div>
                  <span className="progress-description">
                    70% Increase in 30 Days</span>

                  {/* /.info-box-content */}
                </div>
                {/* /.info-box */}
              </div>
            </>


          }
        </div>
        <div className="row">
          <p>&nbsp;</p>
        </div>
      </section>
    </div>

  );
}
