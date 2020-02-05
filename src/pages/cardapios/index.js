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

  async function loadCardapio() {
    const query = '/cardapios/estabelecimento/'+ userestab;
    const response = await api.get(query);
    const data = await response.data;
    setCardapio(data);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    loadCardapio();
  }, []);

  async function handleRemove(id, item){
    if (window.confirm('Confirma remoção de ' + item + ' ?')){
      await api.delete('/cardapios/' + id);
      loadCardapio();
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
                    Meu Cardápio<small>( seu cardápio )</small>
                </h1>
            </section>

            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                           
                            <div className="box-body table-responsive">

                            <a class="btn btn-app" href="/cardapio/novo">
                              <i class="fa fa-edit"></i> Novo Item
                            </a>

                            <table className="table table-hover">
                              <tbody>
                              <tr>
                                <th>Item</th>
                                <th>Categoria</th>
                                <th>Valor</th>
                                <th>Ação</th>
                                </tr>
                            {cardapio.map(cardapio => 
                                <tr>
                                  <td>
                                    <a href={'/cardapio/' + cardapio._id}>{cardapio.item}</a>
                                  </td>
                                  <td>
                                    {cardapio.categoria}
                                  </td>
                                  <td>
                                    {cardapio.valor}
                                  </td>
                                  <td>
                                    <button className="btn4" onClick={() => {handleRemove(cardapio._id, cardapio.item)}}>Excluir</button>
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



