import React, {useState,useEffect} from "react";
//painel
export default function Painel({ history }) {
    
    const usertype = localStorage.getItem('eloyusertype');
    const userestab = localStorage.getItem('eloyuserestab');
    const [usernome, setUsernome] = useState("");

    const handleSubmit = pagina=> event=> {
        event.preventDefault();
        history.push(pagina)
    }

    function handleLogout(event) {

        event.preventDefault();

        localStorage.removeItem('eloyuseremail');
        localStorage.removeItem('eloyusernome');
        localStorage.removeItem('eloyuserid');
        localStorage.removeItem('eloyusertype');
        localStorage.removeItem('eloyuserestab');
        history.push('/login');
    }

    useEffect(() => {
        if(usertype == null)
        history.push('/login');
        else
        setUsernome(localStorage.getItem('eloyusernome'));
      }, []);


  return (
    <div className="content">
        <p className="center">Seja Bem Vindo(a) {usernome}</p>
        <div className="formcontent">
            <form onSubmit={handleSubmit('/estabelecimentos/id/' + userestab)}>
                <button type="submit" className="btn">Meu Estabelecimento</button>
            </form>
            <form onSubmit={handleSubmit("/agenda")}>
                <button type="submit" className="btn">Minha Agenda</button>
            </form>
        </div>

        <div className="formcontent">
            <form onSubmit={handleSubmit("/produtos/novo")}>
                <button type="submit" className="btn">Cadastrar Novo Produto</button>
            </form>

            <form onSubmit={handleSubmit("/produtos/listar")}>
                <button type="submit" className="btn">Visualizar Produtos</button>
            </form>
        </div>

        <div className="formcontent">
            <form onSubmit={handleSubmit("/cupons/novo")}>
                <button type="submit" className="btn">Cadastrar Novo Cupom</button>
            </form>

            <form onSubmit={handleSubmit("/cupons/listar")}>
                <button type="submit" className="btn">Visualizar Cupons</button>
            </form>
        </div>

        <div className="formcontent">
            <button className="linkanchor" onClick={handleLogout}>Sair</button>
        </div>
        
    </div>
  );
}
