import React, {useState} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"
//index
export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');


    async function handleSubmit(event) {

        var erro = '';
        event.preventDefault();

        const dataobj = { 
            email: email,
            senha: pwd
          };


          console.log(dataobj);
          console.log("vai entrar");

        const response = await api.post('/admauthenticate', dataobj)
        .catch(function (error) {
            if (error.response){
                erro = error.response.data.error;
            };
        });

        if(erro != '')
            return;

        const data = await response.data;
        
        localStorage.setItem('eloyuseremail', email);
        localStorage.setItem('eloyusernome', data.nome);
        history.push('/painel');
       
      }

    return (
        <>
        <div className="content">

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input
                    id="email"
                    type="email"
                    placeholder="seuemail@dominio.com.br"
                    value={email}
                    required
                    onChange={event => setEmail(event.target.value)}
                />
                <label htmlFor="email">SENHA *</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="sua senha"
                    required
                    value={pwd}
                    onChange={event => setPwd(event.target.value)}
                />
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