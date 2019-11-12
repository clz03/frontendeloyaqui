import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Estab({ history }) {
const [cupom, setCupom] = useState([]);
const [loading, setLoading] = useState("");

  useEffect(() => {
    async function loadCupom() {
      const response = await api.get('/cupons');
      const data = await response.data.result;
      setCupom(data);
      setLoading(false);
    }
    setLoading(true);
    loadCupom();
  }, []);

  return (
    <div className="content">
      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }
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
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}
