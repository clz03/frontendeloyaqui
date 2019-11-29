import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Prod({ history }) {
const [prod, setProd] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');

const userestab = localStorage.getItem('eloyuserestab');
const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadProd() {
      const query = usertype > 0 ? '/produtos' : '/produtos/estabelecimento/'+ userestab;
      const response = await api.get(query);
      const data = await response.data;
      setProd(data);
      setLoading(false);
    }
    setLoading(true);
    loadProd();
    setMsgvazio("Nenhum produto encontrado");
  }, []);

  return (
    <div className="content">
       {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }
      <h1>Produtos / Serviços</h1>
       <table>
       <tr>
           <th>Nome</th>
           <th>Descrição</th>
           <th>Preço</th>
         </tr>
        {prod.length ? prod.map(prod => 
            <tr>
              <td>
                <a href={'/produtos/id/' + prod._id}>{prod.nome}</a>
              </td>
              <td>
                {prod.descr}
              </td>
              <td>
                {prod.preco}
              </td>
            </tr>
        ) : msgvazio}
      </table>
      <button className="btn3" onClick={() => { usertype > 0 ? history.push('/admpainel') : history.push('/painel') }}>Voltar</button>
    </div>
  );
}


//nome, 
//descr, 
//preco, 
//imagem, 
//promocao, 
//idestabelecimento
