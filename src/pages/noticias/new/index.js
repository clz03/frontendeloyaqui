import React, { useState } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Noticia({ history }) {

  const [titulo, setTitulo] = useState("");
  const [descr, setDescr] = useState("");
  const [datacreat, setDatacreat] = useState("");
  const [imagem, setImagem] = useState("");

  async function handleSubmit(event) {
      
    event.preventDefault();

    const dataobj = { 
      titulo: titulo, 
      descr: descr,
      data: datacreat,
      imagem: imagem
    };

    await api.post('/noticias', dataobj)
    history.push('/painel')

}

  return (
    <div className="content">
    <form onSubmit={handleSubmit}>

      <label htmlFor="titulo">Titulo*</label>
      <input
        id="titulo"
        placeholder="Titulo da Noticia"
        value={titulo}
        onChange={event => setTitulo(event.target.value)}
      />

      <label htmlFor="descr">Descrição*</label>
      <textarea
        id="descr"
        placeholder="Descrição da Noticia"
        rows="15"
        value={descr}
        onChange={event => setDescr(event.target.value)}
      />

      <label htmlFor="datacreat">Data Criação</label>
      <input
        id="datacreat"
        placeholder="AAAA-MM-DD"
        value={datacreat}
        onChange={event => setDatacreat(event.target.value)}
      />

      <label htmlFor="imagem">URL da Imagem</label>
      <input
        id="imagem"
        placeholder="URL da Imagem"
        value={imagem}
        onChange={event => setImagem(event.target.value)}
      />

      <button type="submit" className="btn">Salvar</button> 
      <button className="btn2" onClick={history.goBack}>Cancelar</button>

    </form>
  </div>
  );
}



