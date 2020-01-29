import React, {useState} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import carregando from "../../assets/loading.gif";
import googlestore from "../../assets/google-play.png"
//index
export default function Login({ history }) {

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [loading, setLoading] = useState("");

    async function handleSubmit(event) {
        
        setLoading(true);
        event.preventDefault();

        const dataobj = { 
            email: email,
            senha: pwd
          };

        await api.post('/admauthenticate', dataobj)
        .then((res) => {
            if(res.data.error != undefined){
                alert(res.data.error);
                setLoading(false);
                return;
            }else{
                localStorage.setItem('eloyuseremail', email);
                localStorage.setItem('eloyusernome', res.data.nome);
                localStorage.setItem('eloyuserid', res.data._id);
                localStorage.setItem('eloyusertype', res.data.tipo);
                localStorage.setItem('eloyuserestab', res.data.idestabelecimento);
                setLoading(false);
                if(res.data.tipo > 0){
                    history.push('/admpainel');
                } else {
                    history.push('/painel');
                }  
            }
        }).catch((error) => {
            alert(error);
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
                <label htmlFor="email">SENHA *</label>
                <input
                    id="senha"
                    type="password"
                    placeholder="sua senha"
                    required
                    value={pwd}
                    onChange={event => setPwd(event.target.value)}
                />
                <a className="right" href="/esquecisenha">esqueci minha senha</a>
                <button type="submit" className="btn">Entrar</button> 
                {loading && 
                    <div className="center">
                        <img src={carregando} width="80"></img>
                    </div>
                }
            </form>
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