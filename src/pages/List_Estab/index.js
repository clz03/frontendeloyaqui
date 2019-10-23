import React, { useState, useEffect } from "react";
import "../../App.css";
import api from '../../services/api';

export default function List_Estab({ history }) {
const [estab, setEstab] = useState([]);

  useEffect(() => {
    async function loadEstab() {
      const response = await api.get('/estabelecimentos/Todos');
      const data = await response.data;
      setEstab(data);
    }
    
    loadEstab();
  }, []);

  return (
    <div className="content">
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
    </div>
  );
}



