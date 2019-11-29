import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Novo_Estab({ history }) {

  const [validade, setValidade] = useState("");
  const [premio, setPremio] = useState("");
  const [regra, setRegra] = useState("");
  const [expirado, setExpirado] = useState("");
  const [idestab, setIdestab] = useState("");
  const [ishidden, setIshidden] = useState("");

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        validade: validade.substring(6,10) + "-" + validade.substring(3,5) + "-" + validade.substring(0,2), 
        premio: premio,
        regra: regra,
        expirado: expirado,
        idestabelecimento: idestab
      };

      await api.post('/cupons', dataobj)
      history.push('/cupons/listar')

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

        <label htmlFor="validade">Validade*</label>
        <input
          id="validade"
          placeholder="DD/MM/AAAA"
          maxLength={10}
          value={validade}
          onChange={event => setValidade(event.target.value)}
        />

        <label htmlFor="premio">Titulo Cupom*</label>
        <input
          id="premio"
          placeholder="Titulo do Cupom"
          maxLength={50}
          value={premio}
          onChange={event => setPremio(event.target.value)}
        />

        <label htmlFor="regra">Regra do Cupom*</label>
        <input
          id="regra"
          placeholder="Regra do Cupom"
          maxLength={80}
          value={regra}
          onChange={event => setRegra(event.target.value)}
        />

        <label htmlFor="expirado">Expirado?</label>
        <input
          id="expirado"
          placeholder="1=SIM / 0=Não"
          maxLength={1}
          value={expirado}
          onChange={event => setExpirado(event.target.value)}
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
        <button className="btn2" onClick={() => { usertype > 0 ? history.push('/admpainel') : history.push('/painel') }}>Voltar</button>

      </form>
    </div>
  );
}



