import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function List_Cupom({ history }) {
  const [cupom, setCupom] = useState([]);
  const [loading, setLoading] = useState("");
  const [msgvazio, setMsgvazio] = useState('carregando...');

  const userestab = localStorage.getItem('eloyuserestab');
  const usertype = localStorage.getItem('eloyusertype');

  async function loadCupom() {
    const query = usertype > 0 ? '/cupons/Todos' : '/cupons/estabelecimento/'+ userestab;
    const response = await api.get(query);
    const data = await response.data;
    setCupom(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadCupom();
    setMsgvazio("Nenhum cupom encontrado");
  }, []);

  async function handleRemove(id, item){
    if (window.confirm('Confirma remoção de ' + item + ' ?')){
      await api.delete('/cupons/' + id);
      loadCupom();
    }
  }

  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    Cupons<small>( seus cupons oferecidos )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                            <a class="btn btn-app">
                              <i class="fa fa-edit"></i> Novo Cupom
                            </a>

                            <a class="btn btn-app">
                              <i class="fa fa-edit"></i> Remover Selecionado
                            </a>

                            <table className="table table-hover">
                              <tbody>
                              <tr>
                                <th>Descrição</th>
                                <th>Regra</th>
                                <th>Validade</th>
                                <th>Ação</th>
                                </tr>
                                {cupom.length ? cupom.map(cupom => 
                                  <tr>
                                    <td>
                                      <a href={'/cupons/id/' + cupom._id}>{cupom.premio}</a>
                                    </td>
                                    <td>
                                      {cupom.regra}
                                    </td>
                                    <td>
                                      {cupom.validade.substring(8,10) + "/" + cupom.validade.substring(5,7) + "/" + cupom.validade.substring(0,4)}
                                    </td>
                                    <td>
                                    <button className="btn4" onClick={() => {handleRemove(cupom._id, cupom.premio)}}>Excluir</button>
                                    </td>
                                  </tr>
                              ) : msgvazio}
                              </tbody>
                            </table>


                            </div>
                            {/* /.box-body */}
                        </div>
                        {/* /.box */}
                    </div>
                </div>
            </section>
            {/* /.content */}
        </div>
    </div>
    
    <Footer/>
    </>
)
}
