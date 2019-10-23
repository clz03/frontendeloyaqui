import React from "react";

export default function Painel({ history }) {
    
    const handleSubmit = pagina=> event=> {
        event.preventDefault();
        history.push(pagina)
    }

  return (
    <div className="content">
        <form onSubmit={handleSubmit("/estabelecimentos/novo")}>
            <button type="submit" className="btn">Cadastrar Novo Estabelecimento</button>
        </form>
        <form onSubmit={handleSubmit("/estabelecimentos/listar")}>
            <button type="submit" className="btn">Visualizar Estabelecimentos</button>
        </form>
        
        <form onSubmit={handleSubmit("/produtos")}>
            <button type="submit" className="btn">Cadastrar Novo Produto</button>
            <button type="submit" className="btn">Visualizar Produtos</button>
        </form>
        <form onSubmit={handleSubmit("/noticias")}>
            <button type="submit" className="btn">Cadastrar Nova Notícia</button>
            <button type="submit" className="btn">Visualizar Notícias</button>
        </form>
        <form onSubmit={handleSubmit("/cupons")}>
            <button type="submit" className="btn">Cadastrar Novo Cupom</button>
            <button type="submit" className="btn">Visualizar Cupons</button>
        </form>
        <form onSubmit={handleSubmit("/usuarios")}>
            <button type="submit" className="btn">Cadastrar Novo Usuário</button>
            <button type="submit" className="btn">Visualizar Usuários</button>
        </form>    
    </div>
  );
}
