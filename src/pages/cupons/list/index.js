import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Cupom({ history }) {
  const [cupom, setCupom] = useState([]);
  const [loading, setLoading] = useState("");
  const [msgvazio, setMsgvazio] = useState('carregando...');

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadCupom() {
      const query = usertype > 0 ? '/cupons' : '/cupons/estabelecimento/'+ userestab;
      const response = await api.get(query);
      const data = await response.data;
      setCupom(data);
      setLoading(false);
    }
    setLoading(true);
    loadCupom();
    setMsgvazio("Nenhum cupom encontrado");
  }, []);

  return (
    <div className="content">
      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }
      <h1>Cupons</h1>
       <table>
        <tr>
           <th>Descrição</th>
           <th>Regra</th>
           <th>Validade</th>
         </tr>
        {cupom.length ? cupom.map(cupom => 
            <tr>
              <td>
                <a href={'/cupons/id/' + cupom._id}>{cupom.premio}</a>
              </td>
              <td>
                {cupom.regra}
              </td>
              <td>
                {cupom.validade}
              </td>
            </tr>
        ) : msgvazio}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}
