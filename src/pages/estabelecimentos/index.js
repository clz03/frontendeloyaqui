import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from "../../services/api";
import Header from "../../Header";
import SideMenu from "../../SideMenu";
import Footer from "../../Footer";

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
    { label: "Abre as 06:00", value: "6" },
    { label: "Abre as 07:00", value: "7" },
    { label: "Abre as 08:00", value: "8" },
    { label: "Abre as 09:00", value: "9" },
    { label: "Abre as 10:00", value: "10" },
    { label: "Abre as 11:00", value: "11" },
    { label: "Abre as 12:00", value: "12" },
    { label: "Abre as 13:00", value: "13" },
    { label: "Abre as 14:00", value: "14" },
    { label: "Abre as 15:00", value: "15" },
    { label: "Abre as 16:00", value: "16" },
    { label: "Abre as 17:00", value: "17" },
    { label: "Abre as 18:00", value: "18" },
    { label: "Abre as 19:00", value: "19" },
    { label: "Abre as 20:00", value: "20" },
    { label: "Sem Funcionamento", value: "-1" }
  ];

  const horarios_fim = [
    { label: "Fecha as 10:00", value: "10" },
    { label: "Fecha as 11:00", value: "11" },
    { label: "Fecha as 12:00", value: "12" },
    { label: "Fecha as 13:00", value: "13" },
    { label: "Fecha as 14:00", value: "14" },
    { label: "Fecha as 15:00", value: "15" },
    { label: "Fecha as 16:00", value: "16" },
    { label: "Fecha as 17:00", value: "17" },
    { label: "Fecha as 18:00", value: "18" },
    { label: "Fecha as 19:00", value: "19" },
    { label: "Fecha as 20:00", value: "20" },
    { label: "Fecha as 21:00", value: "21" },
    { label: "Fecha as 22:00", value: "22" },
    { label: "Fecha as 23:00", value: "23" },
    { label: "Sem Funcionamento", value: "-1" }
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
  const [complemento, setComplemento] = useState("");
  const [fone1, setFone1] = useState("");
  const [fone2, setFone2] = useState("");
  const [agendamento, setAgendamento] = useState(false);
  const [enableFeriado, setEnableFeriado] = useState(false);
  const [cardapio, setCardapio] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [entrega, setEntrega] = useState(false);
  const [retira, setRetira] = useState(false);
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [hashtags, setHashtags] = useState("");
  //const [hrinicio_semana, setHrinicio_semana] = useState("");
  //const [hrfim_semana, setHrfim_semana] = useState("");
  //const [hrinicio_sabado, setHrinicio_sabado] = useState("");
  //const [hrfim_sabado, setHrfim_sabado] = useState("");
  //const [hrinicio_domingo, setHrinicio_domingo] = useState("");
  //const [hrfim_domingo, setHrfim_domingo] = useState("");
  const [pedidominimo, setPedidominimo] = useState("");
  const [taxaentrega, setTaxaentrega] = useState("");
  const [tempoentrega, setTempoentrega] = useState("");
  const [temporetira, setTemporetira] = useState("");
  const [idcategoria, setIdcategoria] = useState("");
  const [loading, setLoading] = useState("");

  //const usertype = localStorage.getItem("eloyusertype");
  var userestab = localStorage.getItem("eloyuserestab");
  //const url_string = window.location.href;
  //const param = url_string.split("/");
  //if (usertype > 0) userestab = param[6];

  async function loadEstab() {
    const response = await api.get("/estabelecimentos_adm/" + userestab);
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
    setComplemento(data[0].complemento);
    setFone1(data[0].fone1);
    setFone2(data[0].fone2);
    setAgendamento(data[0].agendamento);
    setCardapio(data[0].cardapio);
    setDelivery(data[0].delivery);
    setEntrega(data[0].entrega);
    setRetira(data[0].retira)
    setEmail(data[0].email);
    setInstagram(data[0].instagram);
    setWhatsapp(data[0].whatsapp);
    setHashtags(data[0].hashtags);
    setEnableFeriado(data[0].enableFeriado)
    //setHrinicio_semana(data[0].hrinicio_semana);
    //setHrfim_semana(data[0].hrfim_semana);
    //setHrinicio_sabado(data[0].hrinicio_sabado);
    //setHrfim_sabado(data[0].hrfim_sabado);
    //setHrinicio_domingo(data[0].hrinicio_domingo);
    //setHrfim_domingo(data[0].hrfim_domingo);
    setPedidominimo(data[0].pedidominimo);
    setTaxaentrega(data[0].taxaentrega);
    setTempoentrega(data[0].tempoentrega);
    setTemporetira(data[0].temporetira);
    
    categorias.forEach(function(entry) {
      if(entry.value == data[0].idcategoria[0]){
        setIdcategoria(entry.label);
      }
    });
    
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadEstab();
    document.getElementById('menu_estabelecimento').className = "active";
  }, []);

  // function handleSelectMulti(event) {
  //   var options = event.target.options;
  //   var value = [];
  //   for (var i = 0, l = options.length; i < l; i++) {
  //     if (options[i].selected) {
  //       value.push(options[i].value);
  //     }
  //   }
  //   setIdcategoria(value);
  // }

  async function handleSubmit(event) {
    setLoading(true);
    event.preventDefault();

    const dataobj = {
      //nome: nome,
      descr: descr,
      //tipo: tipo,
      //subtipo: subtipo,
      imagem: imagem,
      imagemcapa: imagemcapa,
      rua: rua,
      numero: numero,
      bairro: bairro,
      cep: cep,
      complemento: complemento,
      fone1: fone1,
      fone2: fone2,
      agendamento: agendamento,
      cardapio: cardapio,
      delivery: delivery,
      //plano: plano,
      email: email,
      //facebook: facebook,
      instagram: instagram,
      whatsapp: whatsapp,
      hashtags: hashtags,
      enableFeriado: enableFeriado,
      //hrinicio_semana: hrinicio_semana,
      //hrfim_semana: hrfim_semana,
      //hrinicio_sabado: hrinicio_sabado,
      //hrfim_sabado: hrfim_sabado,
      //hrinicio_domingo: hrinicio_domingo,
      //hrfim_domingo: hrfim_domingo,
      pedidominimo: pedidominimo,
      taxaentrega: taxaentrega,
      tempoentrega: tempoentrega,
      temporetira: temporetira,
      entrega: entrega,
      retira: retira,
      //idcategoria: idcategoria
    };

    await api.put("/estabelecimentos/" + userestab, dataobj);
    setLoading(false);
    history.push("/painel");
  }

  return (
    <>
      <Header />
      <SideMenu />

      <div className="content-wrapper">
        <section className="content-header">
          <h1>
            {nome}
            <small>
              &nbsp;( {tipo} / {subtipo} )
            </small>
          </h1>
        </section>

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box box-info">
                {loading && (
                  <div style={{ alignItems: "center", textAlign: "center" }}>
                    <img src={carregando} width="80"></img>
                  </div>
                )}

                <form className="form-horizontal" onSubmit={handleSubmit}>
                  <div className="box-body">
                  
                  <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Categorias*
                      </label>
                      <div className="col-sm-10">
                      <input
                          id="categorias"
                          value={idcategoria}
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="plano"
                      >
                        Plano*
                      </label>
                      <div className="col-sm-10">
                      <input
                          id="plano"
                          value="Premium"
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Descrição*
                      </label>
                      <div className="col-sm-10">
                        <textarea
                          id="descr"
                          placeholder="Descrição do Estabelecimento"
                          value={descr}
                          className="form-control"
                          style={{height:'80px'}}
                          maxLength={250}
                          required
                          onChange={event => setDescr(event.target.value)}
                        />
                      </div>
                    </div>

                    {/* <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        URL da Imagem*
                      </label>
                      <div className="col-sm-10">
                        <input
                          id="imagem"
                          placeholder="URL da imagem do Estabelecimento"
                          value={imagem}
                          className="form-control"
                          maxLength={250}
                          onChange={event => setImagem(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        URL da Imagem Capa*
                      </label>
                      <div className="col-sm-10">
                        <input
                          id="imagemcapa"
                          placeholder="URL da imagem Capa do Estabelecimento"
                          value={imagemcapa}
                          className="form-control"
                          maxLength={250}
                          onChange={event => setImagemcapa(event.target.value)}
                        />
                      </div>
                    </div> */}

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Rua*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="rua"
                          placeholder="Rua do Estabelecimento"
                          value={rua}
                          className="form-control"
                          maxLength={50}
                          required
                          onChange={event => setRua(event.target.value)}
                        />
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Número*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="numero"
                          placeholder="Número do Estabelecimento"
                          value={numero}
                          className="form-control"
                          maxLength={5}
                          required
                          onChange={event => setNumero(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Bairro*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="bairro"
                          placeholder="Bairro do Estabelecimento"
                          value={bairro}
                          className="form-control"
                          maxLength={20}
                          required
                          onChange={event => setBairro(event.target.value)}
                        />
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        CEP*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="cep"
                          placeholder="CEP do Estabelecimento"
                          value={cep}
                          className="form-control"
                          maxLength={10}
                          required
                          onChange={event => setCEP(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Complemento
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="complemento"
                          placeholder="Complemento do endereço"
                          value={complemento}
                          className="form-control"
                          maxLength={80}
                          onChange={event => setComplemento(event.target.value)}
                        />
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        E-mail*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="email"
                          placeholder="E-mail do estabelecimento"
                          value={email}
                          className="form-control"
                          required
                          maxLength={40}
                          onChange={event => setEmail(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Telefone*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="fone1"
                          placeholder="Telefone do Estabelecimento"
                          value={fone1}
                          className="form-control"
                          maxLength={14}
                          required
                          onChange={event => setFone1(event.target.value)}
                        />
                      </div>


                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Telefone 2
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="fone2"
                          placeholder="Telefone 2 do Estabelecimento"
                          value={fone2}
                          className="form-control"
                          maxLength={14}
                          onChange={event => setFone2(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                    <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Whatsapp
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="whatsapp"
                          placeholder="Whatsapp do estabelecimento"
                          value={whatsapp}
                          className="form-control"
                          maxLength={14}
                          onChange={event => setWhatsapp(event.target.value)}
                        />
                      </div>


                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Instagram
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="instagram"
                          placeholder="Instagram do estabelecimento"
                          value={instagram}
                          className="form-control"
                          maxLength={30}
                          onChange={event => setInstagram(event.target.value)}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="plano"
                      >
                        Palavras Chave*
                      </label>
                      <div className="col-sm-10">
                      <input
                          id="plano"
                          value={hashtags}
                          placeholder="barbeiro, corte, barba, visual"
                          className="form-control"
                          maxLength={30}
                          onChange={event => setHashtags(event.target.value)}
                        />
                      </div>
                    </div>

                    {/* <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horário Semanal*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrinicio_semana"
                          value={hrinicio_semana}
                          className="form-control select2"
                          onChange={event =>
                            setHrinicio_semana(event.target.value)
                          }
                        >
                          {horarios_inicio.map(horarios_inicio => (
                            <option
                              key={horarios_inicio.value}
                              value={horarios_inicio.value}
                            >
                              {horarios_inicio.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horário Fim Semanal*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrfim_semana"
                          value={hrfim_semana}
                          className="form-control select2"
                          onChange={event =>
                            setHrfim_semana(event.target.value)
                          }
                        >
                          {horarios_fim.map(horarios_fim => (
                            <option
                              key={horarios_fim.value}
                              value={horarios_fim.value}
                            >
                              {horarios_fim.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horário Sabados*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrinicio_sabado"
                          value={hrinicio_sabado}
                          className="form-control select2"
                          onChange={event =>
                            setHrinicio_sabado(event.target.value)
                          }
                        >
                          {horarios_inicio.map(horarios_inicio => (
                            <option
                              key={horarios_inicio.value}
                              value={horarios_inicio.value}
                            >
                              {horarios_inicio.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horário Fim Sabados*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrfim_sabado"
                          value={hrfim_sabado}
                          className="form-control select2"
                          onChange={event =>
                            setHrfim_sabado(event.target.value)
                          }
                        >
                          {horarios_fim.map(horarios_fim => (
                            <option
                              key={horarios_fim.value}
                              value={horarios_fim.value}
                            >
                              {horarios_fim.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horário Domingos*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrinicio_domingo"
                          value={hrinicio_domingo}
                          className="form-control select2"
                          onChange={event =>
                            setHrinicio_domingo(event.target.value)
                          }
                        >
                          {horarios_inicio.map(horarios_inicio => (
                            <option
                              key={horarios_inicio.value}
                              value={horarios_inicio.value}
                            >
                              {horarios_inicio.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Horario Fim Domingos*
                      </label>
                      <div className="col-sm-4">
                        <select
                          id="hrfim_domingo"
                          value={hrfim_domingo}
                          className="form-control select2"
                          onChange={event =>
                            setHrfim_domingo(event.target.value)
                          }
                        >
                          {horarios_fim.map(horarios_fim => (
                            <option
                              key={horarios_fim.value}
                              value={horarios_fim.value}
                            >
                              {horarios_fim.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}




                    {/* <div className="form-group">
                    {retira | entrega &&
                    <>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Valor Mínimo Pedido*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="valorminimo"
                          placeholder="15,00"
                          value={pedidominimo}
                          className="form-control"
                          maxLength={8}
                          required
                          onChange={event => setPedidominimo(event.target.value)}
                        />
                      </div>
                      </>
                    }

                      {retira && 
                      <>
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Tempo médio de retirada (minutos)*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="temporetira"
                          placeholder="40"
                          value={temporetira}
                          className="form-control"
                          maxLength={10}
                          required
                          onChange={event => setTemporetira(event.target.value)}
                        />
                      </div>
                      </>
                      }
                    </div>

                      {entrega && 

                    <div className="form-group">
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Tempo médio de entrega (minutos)*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="tempoentrega"
                          placeholder="60"
                          value={tempoentrega}
                          className="form-control"
                          maxLength={20}
                          required
                          onChange={event => setTempoentrega(event.target.value)}
                        />
                      </div>
                      
                      <label
                        className="col-sm-2 control-label"
                        htmlFor="idcategoria"
                      >
                        Taxa de entrega*
                      </label>
                      <div className="col-sm-4">
                        <input
                          id="taxaentrega"
                          placeholder="4,00"
                          value={taxaentrega}
                          className="form-control"
                          maxLength={8}
                          required
                          onChange={event => setTaxaentrega(event.target.value)}
                        />
                      </div> 


                     
                    </div>
                  }*/}


                    <div className="form-group">

                    <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input
                              id='cardapio'
                              type="checkbox"
                              checked={cardapio === true ? "checked" : ""}
                              onChange={event => {setCardapio(!cardapio); setEntrega(!cardapio); setRetira(!cardapio); setAgendamento(false)}}
                            />
                            Cardapio Online ?
                          </label>
                        </div>
                      </div>

                      {/* <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input
                              id='delivery'
                              type="checkbox"
                              checked={delivery === true ? "checked" : ""}
                              onChange={event => {setDelivery(!delivery); setCardapio(true); setAgendamento(false)}}
                            />
                            Pedido Online ?
                          </label>
                        </div>
                      </div> */}

                    {/* {cardapio && 
                    <>
                      <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input
                              id='entrega'
                              type="checkbox"
                              checked={entrega === true ? "checked" : ""}
                              onChange={event => {setEntrega(!entrega); setCardapio(true); setAgendamento(false)}}
                            />
                            Habilitar pedidos para entrega ?
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input
                              id='retira'
                              type="checkbox"
                              checked={retira === true ? "checked" : ""}
                              onChange={event => {setRetira(!retira) ; setCardapio(true); setAgendamento(false)}}
                            />
                            Habilitar pedidos para retirada ?
                          </label>
                        </div>
                      </div>
                      </>
                      } */}

                      <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input
                              id='agendamento'
                              type="checkbox"
                              checked={agendamento === true ? "checked" : ""}
                              onChange={event => {setAgendamento(!agendamento); setRetira(false); setEntrega(false); setCardapio(false)}}
                            />
                            Agendamento Online ?
                          </label>
                        </div>
                      </div>

                      <div className="col-sm-offset-2 col-sm-10">
                        <div className="checkbox">
                          <label>
                            <input
                              id='enableFeriado'
                              type="checkbox"
                              checked={enableFeriado === true ? "checked" : ""}
                              onChange={event => {setEnableFeriado(!enableFeriado)}}
                            />
                            Habilitar Agendamento em Feriados ?
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="box-footer text-center">

                    <button className="btn btn-danger" style={{marginRight:'20px'}} onClick={() => history.push("/painel")}><i className="fa fa-arrow-left" /> Voltar</button>

                    <button type="submit" className="btn btn-success"><i className="fa fa-save" /> Salvar</button>

                  </div>

                  {loading && (
                    <div style={{ alignItems: "center", textAlign: "center" }}>
                      <img src={carregando} width="80"></img>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>

  );
}
