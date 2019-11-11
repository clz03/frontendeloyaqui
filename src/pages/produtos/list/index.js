import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function List_Estab({ history }) {
const [prod, setProd] = useState([]);

  useEffect(() => {
    async function loadProd() {
      const response = await api.get('/produtos');
      const data = await response.data;
      setProd(data);
    }
    
    loadProd();
  }, []);

  return (
    <div className="content">
       <table>
        {prod.map(prod => 
            <tr>
              <td>
                <a href={'/produtos/id/' + prod._id}>{prod.nome}</a>
              </td>
              <td>
                {prod.nome}
              </td>
              <td>
                {prod.descr}
              </td>
            </tr>
        )}
      </table>
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}


//nome, 
//descr, 
//preco, 
//imagem, 
//promocao, 
//idestabelecimento
