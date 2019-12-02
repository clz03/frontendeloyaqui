import React, {useState} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import carregando from "../../assets/loading.gif";
import googlestore from "../../assets/google-play.png"
//index
export default function EsqueciSenha({ history }) {

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState("");

    async function handleSubmit(event) {
        
        setLoading(true);
        event.preventDefault();

        const dataobj = { 
            email: email
          };

        await api.post('/admforgotpwd', dataobj)
        .then((res) => {
            if(res.data.error != undefined){
                alert(res.data.error);
                setLoading(false);
                return;
            }else{
                alert(res.data.success);
                setLoading(false);
                history.push('/login');
            }
        }).catch((error) => {
            alert(error.data);
            setLoading(false);
            return;
        });    
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
                <button type="submit" className="btn">Enviar Nova Senha</button> 
                {loading && 
                    <div className="center">
                    <img src={carregando} width="80"></img>
                    </div>
                }
            </form>
            <button className="btn3" onClick={() => history.push('/login')}>Voltar</button>
            <h3 className="center">
                <a href="/precadastro">Ainda não está aqui ? Cadastre seu estabelecimento</a>
            </h3>
        </div>

        <div className="footer">
            <img src={appstore} alt="EloyAqui" width="200px"></img>
            <img src={googlestore} alt="EloyAqui" width="200px"></img>
        </div>        
      </>
    )
}