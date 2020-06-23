import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function List_Prod({ history }) {
const [prof, setProf] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');

const userestab = localStorage.getItem('eloyuserestab');

async function loadProf() {
  const query = '/profissional/estabelecimento/'+ userestab;
  const response = await api.get(query);
  const data = await response.data;
  setProf(data);
  setLoading(false);
}

  useEffect(() => {
    setLoading(true);
    loadProf();
    setMsgvazio("Nenhum profissional encontrado");
    //document.getElementById('menu_profissionais').className = "active";
  }, []);

  async function handleRemove(id, item){
      if (window.confirm('Confirma remoção de ' + item + ' ?')){
        await api.delete('/profissional/' + id);
        loadProf();
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
                    Profissionais<small>( prestadores de serviço em seu estabelecimento )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                            <a className="btn btn-app" href='/profissional/novo'>
                              <i className="fa fa-edit"></i> Novo Profissional
                            </a>

                            <table className="table table-hover">
                              <tbody>
                                <tr>
                                  <th>Nome</th>
                                </tr>
                                {prof.length ? prof.map(prof => 
                                  <tr key={prof._id}>
                                    <td>
                                      <a href={'/profissional/' + prof._id}>{prof.nome}</a>
                                    </td>
                                    <td>
                                    <button className="btn4" onClick={() => {handleRemove(prof._id, prof.nome)}}>Excluir</button>
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


//nome, 
//descr, 
//preco, 
//imagem, 
//promocao, 
//idestabelecimento
