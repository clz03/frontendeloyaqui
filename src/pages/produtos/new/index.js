import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Prod({ history }) {

  const [nome, setNome] = useState("");
  const [descr, setDescr] = useState("");
  const [preco, setPreco] = useState("");
  const [imagem, setImagem] = useState("");
  const [promocao, setPromocao] = useState("");
  const [idestab, setIdestab] = useState("");
  const [ishidden, setIshidden] = useState("");

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        nome: nome, 
        descr: descr,
        preco: preco,
        imagem: imagem,
        promocao: promocao,
        idestabelecimento: idestab
      };

      await api.post('/produtos', dataobj)
      history.push('/painel')

  }

  useEffect(() => {
    if(usertype < 1){
      setIdestab(userestab);
      setIshidden(true);
    }
  }, []);

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>

        <label htmlFor="nome">Nome*</label>
        <input
          id="nome"
          placeholder="Nome do Produto"
          value={nome}
          onChange={event => setNome(event.target.value)}
        />

        <label htmlFor="descr">Descrição*</label>
        <input
          id="descr"
          placeholder="Descrição do Produto"
          value={descr}
          onChange={event => setDescr(event.target.value)}
        />

        <label htmlFor="preco">Preço*</label>
        <input
          id="preco"
          placeholder="XX,XX"
          value={preco}
          onChange={event => setPreco(event.target.value)}
        />

        <label htmlFor="imagem">URL da Imagem</label>
        <input
          id="imagem"
          placeholder="URL da imagem do Estabelecimento"
          value={imagem}
          onChange={event => setImagem(event.target.value)}
        />

        <label htmlFor="promocao">Item em Promoção?</label>
        <input
          id="promocao"
          placeholder="1=SIM / 0=NÃO"
          value={promocao}
          onChange={event => setPromocao(event.target.value)}
        />

        <label htmlFor="idestab" hidden={ishidden}>Estabelecimento</label>
        <input
          id="idestab"
          placeholder="Estabelecimento"
          hidden={ishidden}
          value={idestab}
          onChange={event => setIdestab(event.target.value)}
        />

        <button type="submit" className="btn">Salvar</button> 
        <button className="btn2" onClick={history.goBack}>Cancelar</button>

      </form>
    </div>
  );
}



