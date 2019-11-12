import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Estab({ history }) {
const [estab, setEstab] = useState([]);
const [loading, setLoading] = useState("");

  useEffect(() => {
    async function loadEstab() {
      const response = await api.get('/estabelecimentos/Todos');
      const data = await response.data;
      setEstab(data);
      setLoading(false);
    }
    setLoading(true);
    loadEstab();
  }, []);

  return (
    <div className="content">

      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }

       <table>
        {estab.map(estab => 
            <tr>
              <td>
                <a href={'/estabelecimentos/id/' + estab._id}>{estab.nome}</a>
              </td>
              <td>
                {estab.tipo}
              </td>
              <td>
                {estab.subtipo}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}



