import "./LivroListaItem.css";

export function LivroListaItem ({livro, quantidadeSelecionado, index, onRemove, onAdd, clickItem}) {
    const badgeCounter = (canRender, index) => Boolean(canRender) && (<span className="LivroListaItem__badge">{quantidadeSelecionado}</span>);
    
    const removeButton = (canRender, index) => Boolean(canRender) && (<button className="Acoes__remover" onClick={() => onRemove(index)}>remover</button>);
    
    return (
            <div className="LivroListaItem">
                {badgeCounter(quantidadeSelecionado, index)}
                <div>
                <div className="LivroListaItem__titulo">{livro.titulo}</div>
                <div className="LivroListaItem__autor"><b>Autor:</b> {livro.autor}</div>
                {/* <div className="LivroListaItem__descricao"><b>Descrição:</b> {livro.descricao}</div> */}
                <div className="LivroListaItem__preco">{livro.preco.toFixed(2)}</div>
                <div className="LivroListaItem__acoes Acoes">
                    <button 
                    className={`Acoes__adicionar ${!quantidadeSelecionado && `Acoes__adicionar--preencher`}`}
                    onClick={() => onAdd(index)}
                    >
                        adicionar
                    </button>
                    {removeButton(quantidadeSelecionado, index)}
                </div>
                </div>
                <img className="LivroListaItem__capa"src={livro.capa} alt={`Capa livro ${livro.titulo}`}/>
            </div>
    )
}