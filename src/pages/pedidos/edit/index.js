import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Estab({ history }) {

  const [pedido, setPedido] = useState("");
  const [itenspedido, setItenspedido] = useState("");
  const [status, setStatus] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [taxentrega, setTaxaentrega] = useState("");
  const [total, setTotal] = useState("");

  const url_string = window.location.href;
  const param = url_string.split("/");


  async function loadPedido() {

    const response = await api.get('/pedidos/'+param[4]);
    const data = await response.data;

    setPedido(data);
    setStatus(data[0].status);
    setSubtotal(data[0].subtotal);
    setTaxaentrega(data[0].taxaentrega);
    setTotal(data[0].total);

    loadItensPedido();

  }

  async function loadItensPedido() {

    const response = await api.get('/itenspedido/pedido/'+param[4]);
    const data = await response.data;

    setItenspedido(data);

  }

  function corstatus(){
      
  }


  useEffect(() => {  
    loadPedido();
  },[]);


  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        status: status
      };

      await api.put('/pedidos/'+param[4], dataobj);
      history.push('/pedidos/listar');

  }

  return (
    <div className="content">
        <h1>Detalhe do Pedido</h1>

        <button type="button" className="btn5">Confirmar Recebimento Pedido</button>

        <form onSubmit={handleSubmit}>

      {pedido.length && pedido.map(pedido => 

        <table>
            <tr>
                <th>Nome Cliente:</th>
                <td>{pedido.idusuario}</td>
            </tr>
            <tr>
                <th>Data / Hora do Pedido:</th>
                <td>{pedido.data.substring(8,10) + "/" + pedido.data.substring(5,7) + "/" + pedido.data.substring(0,4) + ' - ' + pedido.data.substring(11,16)}</td>
            </tr>
            <tr>
                <th>Status:</th>
                <td>{pedido.status}</td>
            </tr>
            <tr>
                <th>Entrega ou Retira:</th>
                <td>{pedido.tipoentrega === 'R' ? 'Á Retirar' : 'Entregar'}</td>
            </tr>
            <tr>
                <th>Forma Pagamento:</th>
                <td>{pedido.tipopag === 'D' ? 'Cartão Débito/Crédito' : 'Dinheiro'}</td>
            </tr>
            <tr>
                <th>Subtotal:</th>
                <td>R${pedido.subtotal.toFixed(2)}</td>
            </tr>
            <tr>
                <th>Taxa Entrega:</th>
                <td>R${pedido.taxaentrega.toFixed(2)}</td>
            </tr>
            <tr>
                <th>Total:</th>
                <td><strong>R${pedido.total.toFixed(2)}</strong></td>
            </tr>
        </table>
      )}
        <p>&nbsp;</p>

        <table>
                <tr>
                    <th>Item</th>
                    <th>Quantidade</th>
                </tr>

                {itenspedido.length && itenspedido.map(itempedido => 
                <tr>
                    <td>{itempedido.item} ({itempedido.obs})</td>
                    <td>{itempedido.qtde}</td>
                </tr>
                )}
            </table>

        <p>&nbsp;</p>
        <button className="btn3" onClick={() => history.push('/pedidos/listar')}>Voltar</button>

      </form>
    </div>
  );
}



