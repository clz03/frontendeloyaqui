import React, { useState, useEffect } from "react";
import "../../../App.css";
import api from '../../../services/api';

export default function Edit_Estab({ history }) {

const categorias = [
    { label: "Almoço", value: "5d929cbac39dcd00176af304" },
    { label: "Jantar", value: "5d929ddcc39dcd00176af305" },
    { label: "Café / Chá", value: "5d92a209c39dcd00176af306" },
    { label: "Esportes", value: "5d92a240c39dcd00176af307" },
    { label: "Vestuário", value: "5d92a4a3c39dcd00176af308" },
    { label: "Beleza", value: "5d92a4cdc39dcd00176af309" },
    { label: "Pets", value: "5d92a4e3c39dcd00176af30a" },
    { label: "Saúde", value: "5d92a4f7c39dcd00176af30b" },
    { label: "Educaçao", value: "5d92a516c39dcd00176af30c" }
];
  const [nome, setNome] = useState("");
  const [descr, setDescr] = useState("");
  const [tipo, setTipo] = useState("");
  const [subtipo, setSubtipo] = useState("");
  const [imagem, setImagem] = useState("");
  const [imagemcapa, setImagemcapa] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cep, setCEP] = useState("");
  const [fone1, setFone1] = useState("");
  const [fone2, setFone2] = useState("");
  const [pedonline, setPedonline] = useState("");
  const [plano, setPlano] = useState("");
  const [email, setEmail] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [idcategoria, setIdcategoria] = useState("");

  const url_string = window.location.href;
  const param = url_string.split("/");

  useEffect(() => {
    async function loadEstab() {

      const response = await api.get('/estabelecimentos/'+param[5]);
      const data = await response.data;

      setNome(data[0].nome);
      setDescr(data[0].descr);
      setTipo(data[0].tipo);
      setSubtipo(data[0].subtipo);
      setImagem(data[0].imagem);
      setRua(data[0].rua);
      setNumero(data[0].numero);
      setBairro(data[0].bairro);
      setCEP(data[0].cep);
      setFone1(data[0].fone1);
      setFone2(data[0].fone2);
      setPedonline(data[0].pedonline);
      setPlano(data[0].plano);
      setEmail(data[0].email);
      setFacebook(data[0].facebook);
      setInstagram(data[0].instagram);
      setWhatsapp(data[0].whatsapp);
      setIdcategoria(data[0].idcategoria);
    }
    
    loadEstab();
  },[]);

  function handleSelectMulti(event){
      var options = event.target.options;
      var value = [];
      for (var i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
    setIdcategoria(value);
  }


  async function handleSubmit(event) {
      
      event.preventDefault();

      const dataobj = { 
        nome: nome, 
        descr: descr,
        tipo: tipo,
        subtipo: subtipo,
        imagem: imagem,
        imagemcapa: imagemcapa,
        rua: rua,
        numero: numero,
        bairro: bairro,
        cep: cep,
        fone1: fone1,
        fone2: fone2,
        pedonline: pedonline,
        plano: plano,
        email: email,
        facebook: facebook,
        instagram: instagram,
        whatsapp: whatsapp,
        idcategoria: idcategoria
      };

      await api.put('/estabelecimentos/'+param[5], dataobj)
      history.push('/painel')

  }


  return (
    <div className="content">
      <form onSubmit={handleSubmit}>

        <label htmlFor="idcategoria">Categoria*</label>
        <select
            id="idcategoria"
            multiple="multiple"
            value={idcategoria}
            onChange={handleSelectMulti}
        >
            {categorias.map((categoria) =>
                <option key={categoria.value} value={categoria.value}>{categoria.label}</option>
            )}
        </select>
        

        <label htmlFor="nome">Nome*</label>
        <input
          id="nome"
          placeholder="Nome do Estabelecimento"
          value={nome}
          required
          onChange={event => setNome(event.target.value)}
        />

        <label htmlFor="descr">Descrição*</label>
        <input
          id="descr"
          placeholder="Descrição do Estabelecimento"
          value={descr}
          required
          onChange={event => setDescr(event.target.value)}
        />

        <label htmlFor="tipo">Tipo*</label>
        <input
          id="tipo"
          placeholder="Tipo do Estabelecimento"
          value={tipo}
          required
          onChange={event => setTipo(event.target.value)}
        />

        <label htmlFor="subtipo">Subtipo*</label>
        <input
          id="subtipo"
          placeholder="Subtipo do Estabelecimento"
          value={subtipo}
          required
          onChange={event => setSubtipo(event.target.value)}
        />

        <label htmlFor="imagem">URL da Imagem</label>
        <input
          id="imagem"
          placeholder="URL da imagem do Estabelecimento"
          value={imagem}
          onChange={event => setImagem(event.target.value)}
        />

        <label htmlFor="imagemcapa">URL da Imagem Capa</label>
        <input
          id="imagemcapa"
          placeholder="URL da imagem Capa do Estabelecimento"
          value={imagemcapa}
          onChange={event => setImagemcapa(event.target.value)}
        />

        <label htmlFor="rua">Rua</label>
        <input
          id="rua"
          placeholder="Rua do Estabelecimento"
          value={rua}
          required
          onChange={event => setRua(event.target.value)}
        />

        <label htmlFor="numero">Número</label>
        <input
          id="numero"
          placeholder="Número do Estabelecimento"
          value={numero}
          required
          onChange={event => setNumero(event.target.value)}
        />

        <label htmlFor="bairro">Bairro</label>
        <input
          id="bairro"
          placeholder="Bairro do Estabelecimento"
          value={bairro}
          required
          onChange={event => setBairro(event.target.value)}
        />

        <label htmlFor="cep">CEP</label>
        <input
          id="cep"
          placeholder="CEP do Estabelecimento"
          value={cep}
          required
          onChange={event => setCEP(event.target.value)}
        />

        <label htmlFor="fone1">Telefone</label>
        <input
          id="fone1"
          placeholder="Telefone do Estabelecimento"
          value={fone1}
          required
          onChange={event => setFone1(event.target.value)}
        />

        <label htmlFor="fone2">Telefone 2</label>
        <input
          id="fone2"
          placeholder="Telefone 2 do Estabelecimento"
          value={fone2}
          onChange={event => setFone2(event.target.value)}
        />

        <label htmlFor="pedonline">Tem Pedido Online?</label>
        <input
          id="pedonline"
          placeholder="1=Sim / 0=Nao"
          value={pedonline}
          onChange={event => setPedonline(event.target.value)}
        />

        <label htmlFor="plano">Qual o Plano de assinatura?</label>
        <input
          id="plano"
          placeholder="0=Sem Plano / 1=Plano 1 / 2=Plano 2"
          value={plano}
          required
          onChange={event => setPlano(event.target.value)}
        />  

        <label htmlFor="email">E-mail</label>
        <input
          id="email"
          placeholder="E-mail do estabelecimento"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />  

        <label htmlFor="facebook">Facebook</label>
        <input
          id="facebook"
          placeholder="Facebook do estabelecimento"
          value={facebook}
          onChange={event => setFacebook(event.target.value)}
        />  

        <label htmlFor="instagram">Instagram</label>
        <input
          id="instagram"
          placeholder="Instagram do estabelecimento"
          value={instagram}
          onChange={event => setInstagram(event.target.value)}
        />  

        <label htmlFor="whatsapp">Whatsapp</label>
        <input
          id="whatsapp"
          placeholder="Whatsapp do estabelecimento"
          value={whatsapp}
          onChange={event => setWhatsapp(event.target.value)}
        /> 

        <button type="submit" className="btn">Salvar</button> 
        <button className="btn2" onClick={history.goBack}>Cancelar</button>
      </form>
    </div>
  );
}



