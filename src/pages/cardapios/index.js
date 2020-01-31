import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function List_Cardapio({ history }) {
const [cardapio, setCardapio] = useState([]);
const [loading, setLoading] = useState("");

const userestab = localStorage.getItem('eloyuserestab');
const usertype = localStorage.getItem('eloyusertype');

  useEffect(() => {
    async function loadCardapio() {
      const query = usertype > 0 ? '/cardapios' : '/cardapios/estabelecimento/'+ userestab;
      const response = await api.get(query);
      const data = await response.data;
      setCardapio(data);
      setLoading(false);
    }

    if(usertype == null) history.push('/login');
    setLoading(true);
    loadCardapio();
  }, []);

  return (
    <>

    <Header/>
    <SideMenu/>

    <div>
        <div className="content-wrapper">

            <section className="content-header">
                <h1>
                    Meu Cardápio<small>( seu cardápio )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                            <a class="btn btn-app">
                              <i class="fa fa-edit"></i> Novo Item
                            </a>

                            <a class="btn btn-app">
                              <i class="fa fa-edit"></i> Remover Selecionado
                            </a>

                            <table className="table table-hover">
                              <tbody>
                              <tr>
                                <th>#</th>
                                <th>Item</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                </tr>
                            {cardapio.map(cardapio => 
                                <tr>
                                  <td>
                                    <input type="checkbox" /> 
                                  </td>
                                  <td>
                                    <a href={'/cardapios/id/' + cardapio._id}>{cardapio.item}</a>
                                  </td>
                                  <td>
                                    {cardapio.categoria}
                                  </td>
                                  <td>
                                    {cardapio.valor}
                                  </td>
                                </tr>
                            )}
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



