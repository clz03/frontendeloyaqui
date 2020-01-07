import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Administrador({ history }) {
const [administrador, setAdministrador] = useState([]);
const [loading, setLoading] = useState("");

  useEffect(() => {
    async function loadAdministrador() {
      const response = await api.get('/administradores');
      const data = await response.data;
      setAdministrador(data);
      setLoading(false);
    }
    setLoading(true);
    loadAdministrador();
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
           <th>Tipo</th>
           <th>ID Estab</th>
         </tr>
        {administrador.map(administrador => 
            <tr>
              <td>
                <a href={'/administradores/id/' + administrador._id}>{administrador.email}</a>
              </td>
              <td>
                {administrador.nome}
              </td>
              <td>
                {administrador.pwd}
              </td>
              <td>
                {administrador.tipo ? "Geral" : "Estab"}
              </td>
              <td>
                {administrador.tipo ? "Todos" : administrador.idestabelecimento}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/admpainel') }}>Voltar</button>

      
    </div>
  );
}
