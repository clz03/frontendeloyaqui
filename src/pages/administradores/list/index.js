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
                {administrador.tipo ? "Sim" : "Não"}
              </td>
              <td>
                {administrador.idestabelecimento}
              </td>
              <td>
                {administrador.validado ? "Sim" : "Não"}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>

      
    </div>
  );
}
