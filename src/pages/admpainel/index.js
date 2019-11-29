import React, {useState,useEffect} from "react";
//painel
export default function AdmPainel({ history }) {
    
    const usertype = localStorage.getItem('eloyusertype');

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

        history.push('/login')
    }

    const [usernome, setUsernome] = useState("");

    useEffect(() => {
        if(usertype == null) history.push('/login');
        if(usertype < 1) history.push('/painel');
        setUsernome(localStorage.getItem('eloyusernome'));
      },[]);


  return (
    <div className="content">
        <p className="center">Seja Bem Vindo(a) {usernome}</p>
        
        <div className="formcontent">
            <form onSubmit={handleSubmit("/estabelecimentos/novo")}>
                <button type="submit" className="btn">Cadastrar Novo Estabelecimento</button>
            </form>
            <form onSubmit={handleSubmit("/estabelecimentos/listar")}>
                <button type="submit" className="btn">Visualizar Estabelecimentos</button>
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
            <form onSubmit={handleSubmit("/noticias/novo")}>
                <button type="submit" className="btn">Cadastrar Nova Noticia</button>
            </form>

            <form onSubmit={handleSubmit("/noticias/listar")}>
                <button type="submit" className="btn">Visualizar Noticias</button>
            </form>
        </div>

        <div className="formcontent">
            <form onSubmit={handleSubmit("/usuarios/novo")}>
                <button type="submit" className="btn">Cadastrar Novo Usuario</button>
            </form>
            <form onSubmit={handleSubmit("/usuarios/listar")}>
                <button type="submit" className="btn">Visualizar Usuários</button>
            </form>
        </div>

        <div className="formcontent">
            <form onSubmit={handleSubmit("/administradores/novo")}>
                <button type="submit" className="btn">Cadastrar Novo Administrador</button>
            </form>
            <form onSubmit={handleSubmit("/administradores/listar")}>
                <button type="submit" className="btn">Visualizar Administradores</button>
            </form>
        </div>
        
        <div className="formcontent">
            <button className="linkanchor" onClick={handleLogout}>Sair</button>
        </div>
    </div>
  );
}
