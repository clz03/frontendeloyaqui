import React, {useState} from "react";
import api from '../../services/api';
import appstore from "../../assets/app-store.png"
import googlestore from "../../assets/google-play.png"
import carregando from "../../assets/loading.gif";


export default function Redefinirsenha() {

    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');
    const [loading, setLoading] = useState("");
    const [hidden, setHidden] = useState(false);
    const [statusUser, SetStatusUser] = useState('');

    const url_string = window.location.href;
    const param = url_string.split("/");

    async function handleSubmit(event){
        event.preventDefault();

        const userid = param[4];
        const passcd = param[5];

        if(userid.toString().substring(0 ,1) != passcd.toString().substring(0,1) || userid.toString().substring(5 ,6) != passcd.toString().substring(1,2)){
            alert("Link de revalidacao invalido. Por favor solicitar novamente.");
            return;
        } 

        // const userid = user._id;
        // const useridp1 = userid.toString().substring(0, 1);
        // const useridp2 = userid.toString().substring(5, 6);

        if (pwd !== pwd2) {
            alert("As duas senhas estão diferentes, por favor validar");
            return;
        }

        setLoading(true);

        const dataobj = { 
            pwd: pwd
        };

        await api.put('/usuarios/' + param[4], dataobj)
        .then((res) => {
            if(res.status == 200){
                setLoading(false);
                setHidden(true);
                SetStatusUser("Senha alterada com sucesso. Faça seu login no aplicativo");
            }else{
                SetStatusUser("Sua senha NÃO foi alterada, tente novamente");
                setLoading(false);
            }
        }).catch((error) => {
            SetStatusUser("Sua senha NÃO foi alterada, tente novamente");
            setLoading(false);
        });
    }

    return (
        <>
        <div className="content">
        <form onSubmit={handleSubmit}>
            <label htmlFor="senha" hidden={hidden} >SENHA *</label>
            <input
                id="senha"
                type="password"
                placeholder="nova senha"
                hidden={hidden}
                required
                value={pwd}
                onChange={event => setPwd(event.target.value)}
            />
            <label htmlFor="senha2" hidden={hidden}>CONFIRMA SENHA *</label>
            <input
                id="senha2"
                type="password"
                placeholder="confirme sua nova senha"
                hidden={hidden}
                required
                value={pwd2}
                onChange={event => setPwd2(event.target.value)}
            />
            <button type="submit" className="btn" hidden={hidden}>Redefinir</button> 
            {loading && 
                <div className="center">
                <img src={carregando} width="80"></img>
                </div>
            }
        </form>
        <p>{statusUser}</p>
        </div>

        <div className="footer">
            <img src={appstore} alt="EloyAqui" width="200px"></img>
            <img src={googlestore} alt="EloyAqui" width="200px"></img>
        </div>
 
      </>
    )
}