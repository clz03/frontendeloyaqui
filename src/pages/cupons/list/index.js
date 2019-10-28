import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function List_Estab({ history }) {
const [cupom, setCupom] = useState([]);

  useEffect(() => {
    async function loadCupom() {
      const response = await api.get('/cupons');
      const data = await response.data.result;
      setCupom(data);
    }
    
    loadCupom();
  }, []);

  return (
    <div className="content">
       <table>
        {cupom.map(cupom => 
            <tr>
              <td>
                <a href={'/cupons/id/' + cupom._id}>{cupom.premio}</a>
              </td>
              <td>
                {cupom.premio}
              </td>
              <td>
                {cupom.validade}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={history.goBack}>Voltar</button>
    </div>
  );
}
