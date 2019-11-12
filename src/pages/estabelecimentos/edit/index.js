import React, { useState, useEffect } from "react";
import "../../../App.css";
import carregando from "../../../assets/loading.gif";
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
    { label: "Barbearia", value: "5d92a4f7c39dcd00176af30b" },
    { label: "Educaçao", value: "5d92a516c39dcd00176af30c" },
    { label: "Saúde", value: "5db97c64ca74d100178e45ac" },
    { label: "Construção", value: "5db97db3ca74d100178e45ad" },
    { label: "Serviços", value: "5db97e3bca74d100178e45ae" }
];

const horarios_inicio = [
  { label: "Abre as 08:00", value: "8" },
  { label: "Abre as 08:30", value: "8.5" },
  { label: "Abre as 09:00", value: "9" },
  { label: "Abre as 09:30", value: "9.5" },
  { label: "Abre as 10:00", value: "10" },
  { label: "Abre as 10:30", value: "10.5" },
  { label: "Abre as 11:00", value: "11" },
  { label: "Abre as 11:30", value: "11.5" },
  { label: "Abre as 12:00", value: "12" },
  { label: "Abre as 12:30", value: "12.5" },
  { label: "Abre as 13:00", value: "13" },
  { label: "Abre as 13:30", value: "13.5" },
  { label: "Abre as 14:00", value: "14" },
  { label: "Abre as 14:30", value: "14.5" },
  { label: "Abre as 15:00", value: "15" },
  { label: "Abre as 15:30", value: "15.5" },
  { label: "Abre as 16:00", value: "16" },
  { label: "Abre as 16:30", value: "16.5" },
  { label: "Abre as 17:00", value: "17" },
  { label: "Abre as 17:30", value: "17.5" },
  { label: "Abre as 18:00", value: "18" },
  { label: "Sem Funcionamento", value: "-1" },
];

const horarios_fim = [
  { label: "Fecha as 11:00", value: "11" },
  { label: "Fecha as 11:30", value: "11.5" },
  { label: "Fecha as 12:00", value: "12" },
  { label: "Fecha as 12:30", value: "12.5" },
  { label: "Fecha as 13:00", value: "13" },
  { label: "Fecha as 13:30", value: "13.5" },
  { label: "Fecha as 14:00", value: "14" },
  { label: "Fecha as 14:30", value: "14.5" },
  { label: "Fecha as 15:00", value: "15" },
  { label: "Fecha as 15:30", value: "15.5" },
  { label: "Fecha as 16:00", value: "16" },
  { label: "Fecha as 16:30", value: "16.5" },
  { label: "Fecha as 17:00", value: "17" },
  { label: "Fecha as 17:30", value: "17.5" },
  { label: "Fecha as 18:00", value: "18" },
  { label: "Fecha as 18:30", value: "18.5" },
  { label: "Fecha as 19:00", value: "19" },
  { label: "Fecha as 19:30", value: "19.5" },
  { label: "Fecha as 20:00", value: "20" },
  { label: "Fecha as 20:30", value: "20.5" },
  { label: "Fecha as 21:00", value: "21" },
  { label: "Fecha as 21:30", value: "21.5" },
  { label: "Fecha as 22:00", value: "22" },
  { label: "Sem Funcionamento", value: "-1" },
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
  const [hrinicio_semana, setHrinicio_semana] = useState("");
  const [hrfim_semana, setHrfim_semana] = useState("");
  const [hrinicio_sabado, setHrinicio_sabado] = useState("");
  const [hrfim_sabado, setHrfim_sabado] = useState("");
  const [hrinicio_domingo, setHrinicio_domingo] = useState("");
  const [hrfim_domingo, setHrfim_domingo] = useState("");
  const [idcategoria, setIdcategoria] = useState("");
  const [loading, setLoading] = useState("");

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
      setImagemcapa(data[0].imagemcapa);
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
      setHrinicio_semana(data[0].hrinicio_semana);
      setHrfim_semana(data[0].hrfim_semana);
      setHrinicio_sabado(data[0].hrinicio_sabado);
      setHrfim_sabado(data[0].hrfim_sabado);
      setHrinicio_domingo(data[0].hrinicio_domingo);
      setHrfim_domingo(data[0].hrfim_domingo);
      setIdcategoria(data[0].idcategoria);
      setLoading(false);
    }
    setLoading(true);
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
      setLoading(true);
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
        hrinicio_semana: hrinicio_semana,
        hrfim_semana: hrfim_semana,
        hrinicio_sabado: hrinicio_sabado,
        hrfim_sabado: hrfim_sabado,
        hrinicio_domingo: hrinicio_domingo,
        hrfim_domingo: hrfim_domingo,
        idcategoria: idcategoria
      };

      await api.put('/estabelecimentos/'+param[5], dataobj);
      setLoading(false);
      history.push('/painel');

  }


  return (
    <div className="content">

      {loading && 
        <div className="center">
          <img src={carregando} width="80"></img>
        </div>
      }

      <form onSubmit={handleSubmit}>

        <label htmlFor="idcategoria">Categoria*</label>
        <select
            id="idcategoria"
            multiple="multiple"
            className="select1"
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
        <textarea
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
        <label htmlFor="hrinicio_semana">Horário Semanal</label>
        <select
            id="hrinicio_semana"
            value={hrinicio_semana}
            className="select2"
            onChange={event => setHrinicio_semana(event.target.value)}
        >
            {horarios_inicio.map((horarios_inicio) =>
                <option key={horarios_inicio.value} value={horarios_inicio.value}>{horarios_inicio.label}</option>
            )}
        </select>

        <select
          id="hrfim_semana"
          value={hrfim_semana}
          className="select3"
          onChange={event => setHrfim_semana(event.target.value)}
        >
            {horarios_fim.map((horarios_fim) =>
                <option key={horarios_fim.value} value={horarios_fim.value}>{horarios_fim.label}</option>
            )}
        </select>

        <label htmlFor="hrinicio_sabado">Horário Sabados</label>
        <select
            id="hrinicio_sabado"
            value={hrinicio_sabado}
            className="select2"
            onChange={event => setHrinicio_sabado(event.target.value)}
        >
            {horarios_inicio.map((horarios_inicio) =>
                <option key={horarios_inicio.value} value={horarios_inicio.value}>{horarios_inicio.label}</option>
            )}
        </select>

        <select
          id="hrfim_sabado"
          value={hrfim_sabado}
          className="select3"
          onChange={event => setHrfim_sabado(event.target.value)}
        >
            {horarios_fim.map((horarios_fim) =>
                <option key={horarios_fim.value} value={horarios_fim.value}>{horarios_fim.label}</option>
            )}
        </select>

        <label htmlFor="hrinicio_domingo">Horário Domingos</label>
        <select
            id="hrinicio_domingo"
            value={hrinicio_domingo}
            className="select2"
            onChange={event => setHrinicio_domingo(event.target.value)}
        >
            {horarios_inicio.map((horarios_inicio) =>
                <option key={horarios_inicio.value} value={horarios_inicio.value}>{horarios_inicio.label}</option>
            )}
        </select>

        <select
          id="hrfim_domingo"
          value={hrfim_domingo}
          className="select3"
          onChange={event => setHrfim_domingo(event.target.value)}
        >
            {horarios_fim.map((horarios_fim) =>
                <option key={horarios_fim.value} value={horarios_fim.value}>{horarios_fim.label}</option>
            )}
        </select>

        <label>Disponibiliza Agendamento Online?</label>
        <label htmlFor="pedonline">Sim</label>
        <input
          id="pedonline"
          type="radio"
          value="Sim"
          label="Sim"
          checked={pedonline === true}
          onChange={event => setPedonline(true)}
        />
        <label htmlFor="pedonline2">Não</label>
         <input
          id="pedonline2"
          type="radio"
          value="Não"
          label="Não"
          checked={pedonline === false}
          onChange={event => setPedonline(false)}
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



