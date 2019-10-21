import React, {useState} from "react";

import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"

export default function Login({ history }) {

    const [email, setEmail] = useState('');

    function handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem('user_eloy', email);
        history.push('/painel')
      }

    return (
        <>
        <div className="content">
            {/* <p>O melhor do bairro está aqui !!</p> */}

            <form onSubmit={handleSubmit}>
            <label htmlFor="email">E-MAIL *</label>
            <input
                id="email"
                type="email"
                placeholder="seuemail@dominio.com.br"
            />
            <label htmlFor="email">SENHA *</label>
            <input
                id="senha"
                type="senha"
                placeholder="sua senha"
                value={email}
                onchange={event => setEmail(event.target.value)}
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