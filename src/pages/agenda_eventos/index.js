import React, { useState, useEffect } from "react";
import "../../App.css";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';

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
    const usertype = localStorage.getItem('eloyusertype');

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
    if(usertype == null) history.push('/login');
    setLoading(true);
    const hoje = new Date();
    const hojemes = hoje.getMonth()+1;
    
    setMes(hojemes);
    loadEvento(hojemes);
  }, []);

  return (
    <div className="content">

      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }

      <label htmlFor="meses">Selecione o Mês:</label>
      <select
          id="meses"
          className="select1"
          value={mes}
          onChange={handleMes}
      >
          {meses.map((meses) =>
              <option key={meses.value} value={meses.value}>{meses.label}</option>
          )}
      </select>

       <table>
         <tr>
           <th>Data</th>
           <th>Hora</th>
           <th>Nome</th>
           <th>Email</th>
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
                {evento.idusuario.email}
              </td>
            </tr>
        ) : "Nenhum agendamento neste mês"}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}



