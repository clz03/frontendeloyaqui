import React, { useState } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Usuario({ history }) {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [validado, setValidado] = useState("");
  const [nome, setNome] = useState("");

  async function handleSubmit(event) {
      
    event.preventDefault();

    const dataobj = { 
      email: email, 
      pwd: pwd,
      validado: validado,
      nome: nome
    };

    await api.post('/usuarios', dataobj)
    history.push('/usuarios/listar')

}

  return (
    <div className="content">
    <form onSubmit={handleSubmit}>

      <label htmlFor="nome">Nome*</label>
      <input
        id="nome"
        placeholder="Nome do Usuário"
        value={nome}
        onChange={event => setNome(event.target.value)}
      />

      <label htmlFor="email">E-mail*</label>
      <input

        id="email"
        placeholder="E-mail do Usuário"
        value={email}
        onChange={event => setEmail(event.target.value)}
      />

      <label htmlFor="pwd">Senha*</label>
      <input
        id="pwd"
        placeholder="Senha do Usuário"
        value={pwd}
        onChange={event => setPwd(event.target.value)}
      />

      <label htmlFor="validado">Validado</label>
      <input
        id="validado"
        placeholder="0 = Não / 1 = Sim"
        value={validado}
        onChange={event => setValidado(event.target.value)}
      />

      <button type="submit" className="btn">Salvar</button> 
      <button className="btn2" onClick={history.goBack}>Cancelar</button>

    </form>
  </div>
  );
}



