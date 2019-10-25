import React, { useState } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Estab({ history }) {

  const [validade, setValidade] = useState("");
  const [premio, setPremio] = useState("");
  const [expirado, setExpirado] = useState("");
  const [idestab, setIdestab] = useState("");

  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        validade: validade, 
        premio: premio,
        expirado: expirado,
        idestab: idestab
      };

      await api.post('/cupons', dataobj)
      history.push('/painel')

  }

  return (
    <div className="content">
      <form onSubmit={handleSubmit}>

        <label htmlFor="validade">Validade*</label>
        <input
          id="validade"
          placeholder="AAAA-MM-DD"
          value={validade}
          onChange={event => setValidade(event.target.value)}
        />

        <label htmlFor="premio">Titulo Cupom*</label>
        <input
          id="premio"
          placeholder="Titulo do Cupom"
          value={premio}
          onChange={event => setPremio(event.target.value)}
        />

        <label htmlFor="expirado">Expirado?</label>
        <input
          id="expirado"
          placeholder="1=SIM / 0=Não"
          value={expirado}
          onChange={event => setExpirado(event.target.value)}
        />

        <label htmlFor="idestab">Estabelecimento</label>
        <input
          id="idestab"
          placeholder="Estabelecimento"
          value={idestab}
          onChange={event => setIdestab(event.target.value)}
        />

        <button type="submit" className="btn">Salvar</button> 
        <button className="btn2" onClick={history.goBack}>Cancelar</button>

      </form>
    </div>
  );
}



