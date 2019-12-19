import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Cardapio({ history }) {
const [cardapio, setCardapio] = useState([]);
const [loading, setLoading] = useState("");

const userestab = localStorage.getItem('eloyuserestab');
const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadCardapio() {
      const query = usertype > 0 ? '/cardapios' : '/cardapios/estabelecimento/'+ userestab;
      const response = await api.get(query);
      const data = await response.data;
      setCardapio(data);
      setLoading(false);
    }

    if(usertype == null) history.push('/login');
    setLoading(true);
    loadCardapio();
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
            { usertype > 0 &&
            <th>Estabelecimento</th>
            }
            <th>Categoria</th>
            <th>Item</th>
            <th>Valor</th>
            </tr>
        {cardapio.map(cardapio => 
            <tr>
              { usertype > 0 &&
               <td>
                {cardapio.idestabelecimento.nome}
                </td>
              }
              <td>
                <a href={'/cardapios/id/' + cardapio._id}>{cardapio.item}</a>
              </td>
              <td>
                {cardapio.categoria}
              </td>
              <td>
                {cardapio.valor}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { usertype > 0 ? history.push('/admpainel') : history.push('/painel') }}>Voltar</button>
    </div>
  );
}



