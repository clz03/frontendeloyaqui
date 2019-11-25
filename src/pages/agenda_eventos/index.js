import React, { useState, useEffect } from "react";
import "../../App.css";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';

export default function Agenda({ history }) {

    const [evento, setEvento] = useState([]);
    const [loading, setLoading] = useState("");

    const userestab = localStorage.getItem('eloyuserestab');
    const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadEvento() {
      const response = await api.get('/eventos/estabelecimento/'+ userestab);
      const data = await response.data;
      setEvento(data);
      setLoading(false);
    }

    if(usertype == null) history.push('/login');
    setLoading(true);
    loadEvento();
  }, []);

  return (
    <div className="content">

      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }

       <table>
         <tr>
           <th>Data</th>
           <th>Hora</th>
           <th>Nome</th>
           <th>Email</th>
         </tr>
        {evento.map(evento => 
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
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}



