import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Noticia({ history }) {

  const [categoria, setCategoria] = useState("");
  const [item, setItem] = useState("");
  const [valor, setValor] = useState("");
  const [idestabelecimento, setIdestabelecimento] = useState("");
  const [ishidden, setIshidden] = useState("");

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  async function handleSubmit(event) {
      
    event.preventDefault();

    const dataobj = { 
        categoria: categoria, 
        item: item,
        valor: valor,
        idestabelecimento: idestabelecimento
    };

    await api.post('/cardapios', dataobj)
    history.push('/cardapios/listar')

}

    useEffect(() => {
        if(usertype < 1){
            setIdestabelecimento(userestab);
            setIshidden(true);
        }
    }, []);

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
      <button className="btn2" onClick={history.goBack}>Cancelar</button>

    </form>
  </div>
  );
}



