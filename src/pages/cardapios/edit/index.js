import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Edit_Cardapio({ history }) {

    const [categoria, setCategoria] = useState("");
    const [item, setItem] = useState("");
    const [valor, setValor] = useState("");
    const [idestabelecimento, setIdestabelecimento] = useState("");
    const [ishidden, setIshidden] = useState("");
  

  const url_string = window.location.href;
  const param = url_string.split("/");

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadCardapio() {
      console.log(param[5]);
      const response = await api.get('/cardapios/'+param[5]);
      const data = await response.data;

      setCategoria(data[0].categoria);
      setItem(data[0].item);
      setValor(data[0].valor);
      setIdestabelecimento(data[0].idestabelecimento);

      if(usertype < 1){
        setIdestabelecimento(userestab);
        setIshidden(true);
      }
    }
    
    loadCardapio();
  },[]);


  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        categoria: categoria, 
        item: item,
        valor: valor,
        idestabelecimento: idestabelecimento
      };

      await api.put('/cardapios/'+param[5], dataobj)
      history.push('/cardapios/listar')

  }

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>

      <label htmlFor="categoria">Categoria*</label>
      <input
        id="categoria"
        placeholder="Pratos Executivos"
        value={categoria}
        onChange={event => setCategoria(event.target.value)}
      />

      <label htmlFor="descr">Item*</label>
      <input
        id="item"
        placeholder="Parmegiana de Frango"
        value={item}
        onChange={event => setItem(event.target.value)}
      />

      <label htmlFor="valor">Valor</label>
      <input
        id="valor"
        placeholder="39,90"
        value={valor}
        onChange={event => setValor(event.target.value)}
      />

        <label htmlFor="idestabelecimento" hidden={ishidden}>Estabelecimento</label>
        <input
          id="idestabelecimento"
          hidden={ishidden}
          placeholder="ID do estabelecimento"
          maxLength={50}
          value={idestabelecimento}
          onChange={event => setIdestabelecimento(event.target.value)}
        />

        <button type="submit" className="btn">Salvar</button> 
        <button className="btn2" onClick={() => history.push('/cardapios/listar')}>Cancelar</button>

      </form>
    </div>
  );
}



