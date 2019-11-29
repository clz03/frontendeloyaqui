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

  const url_string = window.location.href;
  const param = url_string.split("/");

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadCupom() {

      const response = await api.get('/cupons/'+param[5]);
      const data = await response.data;

      setValidade(data[0].validade.substring(8,10) + "/" + data[0].validade.substring(5,7) + "/" + data[0].validade.substring(0,4));
      setPremio(data[0].premio);
      setRegra(data[0].regra);
      setExpirado(data[0].expirado);
      setIdestab(data[0].idestabelecimento._id);

      if(usertype < 1){
        setIdestab(userestab);
        setIshidden(true);
      }
    }
    
    loadCupom();
  },[]);


  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        validade: validade.substring(6,10) + "-" + validade.substring(3,5) + "-" + validade.substring(0,2), 
        premio: premio,
        regra: regra,
        expirado: expirado,
        idestab: idestab
      };

      await api.put('/cupons/'+param[5], dataobj)
      history.push('/cupons/listar')

  }

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
        <button className="btn2" onClick={() => history.push('/cupons/listar')}>Cancelar</button>

      </form>
    </div>
  );
}



