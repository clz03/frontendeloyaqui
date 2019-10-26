import React, {useState} from "react";

import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"
//index
export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    function handleSubmit(event) {
        event.preventDefault();

        //api para validar usuario e senha
        //retorna se é valido ou invalid o login
        //caso positivo, direciona para a pagina painel
        //caso negativo mostra mensagem de erro 

        localStorage.setItem('user_eloy', email);
        history.push('/painel')
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