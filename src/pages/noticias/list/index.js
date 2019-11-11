import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function List_Noticia({ history }) {
const [noticia, setNoticia] = useState([]);

  useEffect(() => {
    async function loadNoticia() {
      const response = await api.get('/noticias');
      const data = await response.data.result;
      setNoticia(data);
    }
    
    loadNoticia();
  }, []);

  return (
    <div className="content">
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
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}
