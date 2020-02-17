import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function Valida_Cupom({ history }) {
  const [cupom, setCupom] = useState([]);
  const [loading, setLoading] = useState("");
  const [msgvazio, setMsgvazio] = useState('carregando...');

  const userestab = localStorage.getItem('eloyuserestab');

  async function loadCupom() {
    const query = '/usercupons/estabelecimento/'+ userestab;
    const response = await api.get(query);
    const data = await response.data;
    setCupom(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadCupom();
    setMsgvazio("Nenhum cupom pronto para uso");
  }, []);

  async function handleRemove(id, item){
    if (window.confirm('Confirma utilização de ' + item + ' ?')){

      const dataobj = { 
        utilizado: true
      };

      await api.put('/usercupons/' + id, dataobj);
      setLoading(true);
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
                    Cupons<small>( cupons prontos para utilização )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                          

                            <table className="table table-hover">
                              <tbody>
                              <tr>
                                <th>Cupom</th>
                                <th>Nome</th>
                                <th>Telefone</th>
                                <th>E-mail</th>
                                <th>Status</th>
                                <th>Ação</th>
                                </tr>
                                {cupom.length ? cupom.map(cupom => 
                                  <tr>
                                    <td>
                                      {cupom.idcupom === null ? 'Cupom Removido' : cupom.idcupom.premio}
                                    </td>
                                    <td>
                                      {cupom.idusuario.nome}
                                    </td>
                                    <td>
                                      {cupom.idusuario.telefone}
                                    </td>
                                    <td>
                                      {cupom.idusuario.email}
                                    </td>
                                    <td>
                                      {cupom.idcupom === null && "Cupom removido"}
                                      {cupom.idcupom !== null && !cupom.utilizado && "Válido"}
                                      {cupom.idcupom !== null && cupom.utilizado && "Utilizado"}
                                    </td>
                                    <td>
                                      { cupom.idcupom !== null && !cupom.utilizado ?
                                        <button className="btn4" onClick={() => {handleRemove(cupom._id, cupom.idusuario.nome)}}>Marcar como utilizado</button>
                                        :
                                        " - "
                                      }
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
