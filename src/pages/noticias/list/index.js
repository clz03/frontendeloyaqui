import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Noticia({ history }) {
  const [noticia, setNoticia] = useState([]);
  const [loading, setLoading] = useState("");

  async function loadNoticia() {
    const response = await api.get('/noticias');
    const data = await response.data.result;
    setNoticia(data);
    setLoading(false);
  }

  async function handleRemove(id, item){
    if (window.confirm('Confirma remoção de ' + item + ' ?')){
      await api.delete('/noticias/' + id);
      loadNoticia();
    }
  }

  useEffect(() => {
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
        <tr>
          <th>Titulo</th>
          <th>Data</th>
          <th>Ação</th>
         </tr>
        {noticia.map(noticia => 
            <tr>
              <td>
                <a href={'/noticias/id/' + noticia._id}>{noticia.titulo}</a>
              </td>
              <td>
                {noticia.data}
              </td>
              <td>
               <button className="btn4" onClick={() => {handleRemove(noticia._id, noticia.titulo)}}>Excluir</button>
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/admpainel') }}>Voltar</button>
    </div>
  );
}
