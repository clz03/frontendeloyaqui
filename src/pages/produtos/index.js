import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function List_Prod({ history }) {
const [prod, setProd] = useState([]);
const [loading, setLoading] = useState("");
const [msgvazio, setMsgvazio] = useState('carregando...');

const userestab = localStorage.getItem('eloyuserestab');

async function loadProd() {
  const query = '/produtos/estabelecimento/'+ userestab;
  const response = await api.get(query);
  const data = await response.data;
  setProd(data);
  setLoading(false);
}

  useEffect(() => {
    setLoading(true);
    loadProd();
    setMsgvazio("Nenhum produto encontrado");
    document.getElementById('menu_produto').className = "active";
  }, []);

  async function handleRemove(id, item){
      if (window.confirm('Confirma remoção de ' + item + ' ?')){
        await api.delete('/produtos/' + id);
        loadProd();
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
                    Destaques<small>( produtos em destaque )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                            <a className="btn btn-app" href='/produto/novo'>
                              <i className="fa fa-edit"></i> Novo Destaque
                            </a>

                            <table className="table table-hover">
                              <tbody>
                                <tr>
                                  <th>Nome</th>
                                  <th>Descrição</th>
                                  <th>Preço</th>
                                  <th>Ação</th>
                                </tr>
                                {prod.length ? prod.map(prod => 
                                  <tr key={prod._id}>
                                    <td>
                                      <a href={'/produto/' + prod._id}>{prod.nome}</a>
                                    </td>
                                    <td>
                                      <p>{prod.descr}</p>
                                    </td>
                                    <td>
                                      <p>{prod.preco}</p>
                                    </td>
                                    <td>
                                    <button className="btn4" onClick={() => {handleRemove(prod._id, prod.nome)}}>Excluir</button>
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
