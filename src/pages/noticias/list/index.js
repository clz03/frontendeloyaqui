import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Noticia({ history }) {
const [noticia, setNoticia] = useState([]);
const [loading, setLoading] = useState("");


  useEffect(() => {
    async function loadNoticia() {
      const response = await api.get('/noticias');
      const data = await response.data.result;
      setNoticia(data);
      setLoading(false);
    }
    setLoading(true);
    loadNoticia();
  }, []);

  return (
    <div className="content">
      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }
       <table>
        {noticia.map(noticia => 
            <tr>
              <td>
                <a href={'/noticias/id/' + noticia._id}>{noticia.titulo}</a>
              </td>
              <td>
                {noticia.data}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/admpainel') }}>Voltar</button>
    </div>
  );
}
