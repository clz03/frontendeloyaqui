import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function List_Estab({ history }) {
const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    async function loadUsuario() {
      const response = await api.get('/usuarios');
      const data = await response.data;
      setUsuario(data);
    }
    
    loadUsuario();
  }, []);

  return (
    <div className="content">
       <table>
        {usuario.map(usuario => 
            <tr>
              <td>
                <a href={'/usuarios/id/' + usuario._id}>{usuario.email}</a>
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={history.goBack}>Voltar</button>
    </div>
  );
}
