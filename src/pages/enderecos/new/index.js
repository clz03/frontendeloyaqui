import React, { useState } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Endereco({ history }) {

  const [apelido, setApelido] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCep] = useState("");
  const [complemento, setcomplemento] = useState("");
  const [idusuario, setIdusuario] = useState("");

  const usertype = localStorage.getItem('eloyusertype');

  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        apelido,
        rua,
        numero,
        bairro,
        cep,
        complemento,
        idusuario
      };

      await api.post('/enderecos', dataobj)
      history.push('/enderecos/listar')

  }

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>

      <label htmlFor="apelido">Apelido*</label>
        <input
          id="apelido"
          placeholder="Apelido do Endereço"
          value={apelido}
          maxLength={40}
          onChange={event => setApelido(event.target.value)}
        />

        <label htmlFor="rua">Rua*</label>
        <input
          id="rua"
          placeholder="Rua do Endereço"
          value={rua}
          maxLength={100}
          onChange={event => setRua(event.target.value)}
        />

        <label htmlFor="numero">Número*</label>
        <input
          id="numero"
          placeholder="Número do Endereço"
          maxLength={8}
          value={numero}
          onChange={event => setNumero(event.target.value)}
        />

        <label htmlFor="bairro">Bairro*</label>
        <input
          id="bairro"
          placeholder="Bairro do Endereço"
          value={bairro}
          maxLength={100}
          onChange={event => setBairro(event.target.value)}
        />

        <label htmlFor="cep">CEP*</label>
        <input
          id="cep"
          placeholder="CEP do Endereço"
          value={cep}
          maxLength={8}
          onChange={event => setCep(event.target.value)}
        />

        <label htmlFor="complemento">Complemento</label>
        <input
          id="complemento"
          placeholder="Complemento do Endereço"
          value={complemento}
          maxLength={30}
          onChange={event => setcomplemento(event.target.value)}
        />

        <label htmlFor="idusuario">Usuario</label>
        <input
          id="idusuario"
          placeholder="Id do Usuario"
          maxLength={70}
          value={idusuario}
          onChange={event => setIdusuario(event.target.value)}
        />

        <button type="submit" className="btn">Salvar</button> 
        <button className="btn2" onClick={() => { usertype > 0 ? history.push('/admpainel') : history.push('/painel') }}>Voltar</button>

      </form>
    </div>
  );
}



