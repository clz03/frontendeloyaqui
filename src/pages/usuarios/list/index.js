import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Usuario({ history }) {
  const [usuario, setUsuario] = useState([]);
  const [loading, setLoading] = useState("");

  async function loadUsuario() {
    const response = await api.get('/usuarios');
    const data = await response.data;
    setUsuario(data);
    setLoading(false);
  }

  async function handleRemove(id, item){
    if (window.confirm('Confirma remoção de ' + item + ' ?')){
      await api.delete('/usuarios/' + id);
      loadUsuario();
    }
  }


  useEffect(() => {
    setLoading(true);
    loadUsuario();
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
           <th>E-Mail</th>
           <th>Nome</th>
           <th>PWD</th>
           <th>Validado</th>
           <th>Ação</th>
         </tr>
        {usuario.map(usuario => 
            <tr>
              <td>
                <a href={'/usuarios/id/' + usuario._id}>{usuario.email}</a>
              </td>
              <td>
                {usuario.nome}
              </td>
              <td>
                {usuario.pwd}
              </td>
              <td>
                {usuario.validado ? "Sim" : "Não"}
              </td>
              <td>
               <button className="btn4" onClick={() => {handleRemove(usuario._id, usuario.nome)}}>Excluir</button>
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/admpainel') }}>Voltar</button>

      
    </div>
  );
}
