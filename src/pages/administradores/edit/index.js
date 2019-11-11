import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Edit_Administrador({ history }) {

    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [tipo, setTipo] = useState("");
    const [validado, setValidado] = useState("");
    const [nome, setNome] = useState("");
    const [idestabelecimento, setIdestabelecimento] = useState("");

    const url_string = window.location.href;
    const param = url_string.split("/");


  useEffect(() => {
    async function loadAdministrador() {

      const response = await api.get('/administradores/'+param[5]);
      const data = await response.data;

      setEmail(data[0].email);
      setPwd(data[0].pwd);
      setTipo(data[0].tipo);
      setValidado(data[0].validado);
      setNome(data[0].nome);
      setIdestabelecimento(data[0].idestabelecimento);
    }
    
    loadAdministrador();
  },[]);


  async function handleSubmit(event) {
      
    event.preventDefault();

    const dataobj = { 
      email: email, 
      pwd: pwd,
      tipo:tipo,
      validado: validado,
      nome: nome,
      idestabelecimento: idestabelecimento
    };

    await api.put('/administradores/'+param[5], dataobj)
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



