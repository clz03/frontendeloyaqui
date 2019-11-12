import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Usuario({ history }) {
const [usuario, setUsuario] = useState([]);
const [loading, setLoading] = useState("");

  useEffect(() => {
    async function loadUsuario() {
      const response = await api.get('/usuarios');
      const data = await response.data;
      setUsuario(data);
      setLoading(false);
    }
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
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>

      
    </div>
  );
}
