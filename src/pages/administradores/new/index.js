import React, { useState } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Administrador({ history }) {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [tipo, setTipo] = useState("");
  const [validado, setValidado] = useState("");
  const [nome, setNome] = useState("");
  const [idestabelecimento, setIdestabelecimento] = useState("");

  async function handleSubmit(event) {
      
    event.preventDefault();

    const dataobj = { 
      email: email, 
      pwd: pwd,
      tipo: tipo,
      validado: validado,
      nome: nome,
      idestabelecimento: idestabelecimento
    };

    await api.post('/administradores', dataobj)
    history.push('/administradores/listar')

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

      <label htmlFor="tipo">Tipo*</label>
      <input
        id="tipo"
        placeholder="0 = User Estabelecimento / 1= Master User"
        value={tipo}
        onChange={event => setTipo(event.target.value)}
      />

      <label htmlFor="validado">Validado</label>
      <input
        id="validado"
        placeholder="0 = Não / 1 = Sim"
        value={validado}
        onChange={event => setValidado(event.target.value)}
      />

    <label htmlFor="idestabelecimento">Estabelecimento*</label>
      <input
        id="idestabelecimento"
        placeholder="ID do estabelecimento do administrador"
        value={idestabelecimento}
        onChange={event => setIdestabelecimento(event.target.value)}
      />

      <button type="submit" className="btn">Salvar</button> 
      <button className="btn2" onClick={history.goBack}>Cancelar</button>

    </form>
  </div>
  );
}



