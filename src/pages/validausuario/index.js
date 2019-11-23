import React, {useState, useEffect} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"


export default function ValidaUsuario() {

    const url_string = window.location.href;
    const param = url_string.split("/");

    async function validausuario(event){

        event.preventDefault();
        console.log('entrou');
        const dataobj = { 
            idusuario: param[4]
        };
        console.log(dataobj);
    
        try {
            console.log('0');
            // const response = await api.post('/validacadastro', dataobj);
            const response = await api.post('/validacadastro', dataobj)
            .catch(function (error) {
                console.log('1' + error);
            });

            console.log('2' + response);
        } catch (error) {
            console.log('3' + error);
        }
    }

    useEffect(() => {

        //validausuario();

    },[]);

    return (
        <>
        <div className="content">

          <p>Usuário validado</p>

          <form onSubmit={validausuario}>
            <button type="submit" className="btn">Entrar</button> 
          </form>

        </div>

        <div className="footer">
            <img src={appstore} alt="EloyAqui" width="200px"></img>
            <img src={googlestore} alt="EloyAqui" width="200px"></img>
        </div>
 
      </>
    )
}