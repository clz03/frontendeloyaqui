import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function List_Prod({ history }) {
const [end, setEnd] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');

const usertype = localStorage.getItem('eloyusertype');

async function loadEnderecos() {
  const response = await api.get("/enderecos");
  const data = await response.data;
  setEnd(data);
  setLoading(false);
}

  useEffect(() => {
    setLoading(true);
    loadEnderecos();
    setMsgvazio("Nenhum endereço encontrado");
  }, []);

  async function handleRemove(id, item){
      if (window.confirm('Confirma remoção de ' + item + ' ?')){
        await api.delete('/enderecos/' + id);
        loadEnderecos();
      }
  }

  return (
    <div className="content">
       {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }
      <h1>Endereços</h1>
       <table>
       <tr>
           <th>Apelido</th>
           <th>Rua</th>
           <th>Complemento</th>
           <th>Usuario</th>
           <th>Ação</th>
         </tr>
        {end.length ? end.map(end => 
            <tr>
              <td>
                <a href={'/enderecos/id/' + end._id}>{end.apelido}</a>
              </td>
              <td>
                {end.rua}, {end.numero}
              </td>
              <td>
                {end.complemento}
              </td>
              <td>
                {end.idusuario}
              </td>
              <td>
               <button className="btn4" onClick={() => {handleRemove(end._id, end.apelido)}}>Excluir</button>
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
