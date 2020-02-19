import React, { useState, useEffect } from "react";
import carregando from "../../assets/loading.gif";
import api from '../../services/api';
import Header from '../../Header';
import SideMenu from '../../SideMenu';
import Footer from '../../Footer';

export default function Form_Ajuda({ history }) {

    useEffect(() => {

    }, []);


    return (
        <>

            <Header />
            <SideMenu />

            <div>
                <div className="content-wrapper">

                    <section className="content-header">
                        <h1>
                            Suporte<small>( entre em contato )</small>
                        </h1>
                    </section>

                    <section className="content">

                        <div className="row">
                            <div className="col-md-12">
                              

                                    <div className="box-body pad table-responsive">
                                        <table className="table table-bordered text-center">
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <a
                                                            href='https://api.whatsapp.com/send?phone=5511976023836'
                                                            target='_blank'
                                                            className="btn btn-block btn-success btn-lg"
                                                        >
                                                            Contato por Whatsapp
                                                            </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        
                                    </div>
                                    <p>Colocar FAQs</p>
                                    {/* /.box */}
                              
                            </div>
                            {/* /.col */}
                        </div>

                    </section>
                    {/* /.content */}
                </div>
            </div>

            <Footer />
        </>
    )
}
