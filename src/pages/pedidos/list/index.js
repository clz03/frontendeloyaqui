import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
import api from '../../../services/api';

export default function Pedido({ history }) {

    const [pedido, setPedido] = useState([]);
    const [loading, setLoading] = useState('');

    const userestab = localStorage.getItem('eloyuserestab');
    const usertype = localStorage.getItem('eloyusertype');

    async function loadPedido() {
      const response = await api.get('/pedidos/estabelecimento/' + userestab );
      const data = await response.data;

      setPedido(data);
      setLoading(false);
    }

  useEffect(() => {
    if(usertype === null) history.push('/login');
    setLoading(true);
    loadPedido();
  }, []);

  return (
    <div className="content">

      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }
        <h1>Meus Pedidos</h1>
       <table>
         <tr>
           <th>Pedido</th>
           <th>Recebido</th>
           <th>Status</th>
           <th>Tipo</th>
           <th>Cliente</th>
           <th>Endereco</th>
         </tr>
        {pedido.length ? pedido.map(pedido => 
            <tr>
               <td>
                <a href={'/pedidos/' + pedido._id}>#3456</a>
              </td>
              <td>
                {pedido.data.substring(8,10) + "/" + pedido.data.substring(5,7) + "/" + pedido.data.substring(0,4) + ' - ' + pedido.data.substring(11,16)}
              </td>
              <td>
                {pedido.status}
              </td>
              <td>
                {pedido.tipoentrega === 'E' ? 'Entrega' : 'Retira'}
              </td>
              <td>
                Joao
              </td>
              <td>
                {pedido.rua}, {pedido.numero}
              </td>
            </tr>
        ) : "Nenhum pedido encontrado"}
      </table>
      
      <button className="btn3" onClick={() => { history.push('/painel') }}>Voltar</button>
    </div>
  );
}



