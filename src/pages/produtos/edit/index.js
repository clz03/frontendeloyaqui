import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Estab({ history }) {

  const [nome, setNome] = useState("");
  const [descr, setDescr] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [promocao, setPromocao] = useState("");
  const [idestab, setIdestab] = useState("");
  const [ishidden, setIshidden] = useState("");

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  const url_string = window.location.href;
  const param = url_string.split("/");

  useEffect(() => {
    async function loadProd() {

      const response = await api.get('/produtos/'+param[5]);
      const data = await response.data;

      setNome(data[0].nome);
      setDescr(data[0].descr);
      setPreco(data[0].preco);
      setImagem(data[0].imagem);
      setPromocao(data[0].promocao);
      setIdestab(data[0].idestabelecimento._id);
    }
    
    loadProd();
    if(usertype < 1){
      setIdestab(userestab);
      setIshidden(true);
    }
  },[]);


  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        nome: nome, 
        descr: descr,
        preco: preco,
        imagem: imagem,
        promocao: promocao,
        idestab: idestab
      };

      await api.put('/produtos/'+param[5], dataobj)
      history.push('/produtos/listar')

  }

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>

        <label htmlFor="nome">Nome*</label>
        <input
          id="nome"
          placeholder="Nome do Produto"
          value={nome}
          maxLength={40}
          onChange={event => setNome(event.target.value)}
        />

        <label htmlFor="descr">Descrição*</label>
        <input
          id="descr"
          placeholder="Descrição do Produto"
          value={descr}
          maxLength={100}
          onChange={event => setDescr(event.target.value)}
        />

        <label htmlFor="preco">Preço*</label>
        <input
          id="preco"
          placeholder="XX,XX"
          maxLength={8}
          value={preco}
          onChange={event => setPreco(event.target.value)}
        />

        <label htmlFor="imagem">URL da Imagem</label>
        <input
          id="imagem"
          placeholder="URL da imagem do Estabelecimento"
          value={imagem}
          maxLength={100}
          onChange={event => setImagem(event.target.value)}
        />

        <label htmlFor="promocao">Item em Promoção?</label>
        <input
          id="promocao"
          placeholder="1=SIM / 0=NÃO"
          value={promocao}
          maxLength={1}
          onChange={event => setPromocao(event.target.value)}
        />

        <label htmlFor="idestab" hidden={ishidden}>Estabelecimento</label>
        <input
          id="idestab"
          hidden={ishidden}
          placeholder="Estabelecimento"
          maxLength={50}
          value={idestab}
          onChange={event => setIdestab(event.target.value)}
        />

        <button type="submit" className="btn">Salvar</button> 
        <button className="btn2" onClick={() => history.push('/produtos/listar')}>Cancelar</button>

      </form>
    </div>
  );
}



