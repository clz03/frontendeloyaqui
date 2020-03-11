import React, { useState, useEffect } from "react";
import "../../App.css";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function Agenda({ history }) {

    const [evento, setEvento] = useState([]);
    const [loading, setLoading] = useState('');
    const [mes, setMes] = useState('');

    const meses = [
      { label: "Janeiro", value: "1" },
      { label: "Fevereiro", value: "2" },
      { label: "Março", value: "3" },
      { label: "Abril", value: "4" },
      { label: "Maio", value: "5" },
      { label: "Junho", value: "6" },
      { label: "Julho", value: "7" },
      { label: "Agosto", value: "8" },
      { label: "Setembro", value: "9" },
      { label: "Outubro", value: "10" },
      { label: "Novembro", value: "11" },
      { label: "Dezembro", value: "12" }
    ];

    const userestab = localStorage.getItem('eloyuserestab');

    async function loadEvento(hojemes) {
      const response = await api.get('/eventos/estabelecimento/'+ userestab + '/' + hojemes );
      const data = await response.data;

      setEvento(data);
      setLoading(false);
    }

    function handleMes(event){
      setLoading(true);
      setMes(event.target.value);
      loadEvento(event.target.value);
    };

    useEffect(() => {
      setLoading(true);
      const hoje = new Date();
      const hojemes = hoje.getMonth()+1;
      
      setMes(hojemes);
      loadEvento(hojemes);
      
      try {
        setTimeout(() => {
          document.getElementById('menu_agenda').className = "active";
        }, 1000);  
      } catch (error) { 
      }
    }, []);

  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    Agendamentos de Clientes<small>( sua agenda )</small>
                </h1>
            </section>

            <section className="content">
    <div className="row">

      <div className="col-md-12">


            <div className="box box-info">
            <form className="form-horizontal">
            <div className="box-body">
            <div className="form-group">
              <label className="col-sm-2 control-label" htmlFor="meses">Selecione o Mês:</label>
              <div className="col-sm-4">
              <select
                  id="meses"
                  className="select4"
                  value={mes}
                  className="form-control"
                  onChange={handleMes}
              >
                  {meses.map((meses) =>
                      <option key={meses.value} value={meses.value}>{meses.label}</option>
                  )}
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
                            
                            <div className="box-body table-responsive no-padding">

                            <table className="table table-hover">
                              <tbody>
                                <tr>
                                  <th>Data</th>
                                  <th>Hora</th>
                                  <th>Nome</th>
                                  <th>Telefone</th>
                                  <th>Serviço</th>
                                </tr>
                                {evento.length ? evento.map(evento => 
                                    <tr>
                                      <td>
                                        {evento.data.substring(8,10) + "/" + evento.data.substring(5,7) + "/" + evento.data.substring(0,4)}
                                      </td>
                                      <td>
                                        {evento.hora}:00
                                      </td>
                                      <td>
                                        {evento.idusuario.nome}
                                      </td>
                                      <td>
                                        {evento.idusuario.telefone}
                                      </td>
                                      <td>
                                        {evento.idservico.nome}
                                      </td>
                                    </tr>
                                ) : "Nenhum agendamento neste mês"}
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
    
    <Footer/>
    </>
)
}



