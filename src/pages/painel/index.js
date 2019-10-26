import React from "react";
//painel
export default function Painel({ history }) {
    
    const handleSubmit = pagina=> event=> {
        event.preventDefault();
        history.push(pagina)
    }

  return (
    <div className="content">
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
            <form onSubmit={handleSubmit("/usuarios/listar")}>
                <button type="submit" className="btn">Visualizar Usuários</button>
            </form>
        </div>
    </div>
  );
}
