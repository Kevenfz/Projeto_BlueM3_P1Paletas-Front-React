import "./LivroListaItem.css";
import { ActionMode } from "../../constants/index";

export function LivroListaItem({
  livro,
  quantidadeSelecionado,
  index,
  onRemove,
  onAdd,
  clickItem,
  mode,
}) {
  const removeButton = (canRender, index) =>
    Boolean(canRender) && (
      <button
        disabled={mode !== ActionMode.NORMAL}
        className="Acoes__remover"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(index);
        }}
      >
        remover
      </button>
    );

  const badgeCounter = (canRender) =>
    Boolean(canRender) && (
      <span className="LivroListaItem__badge">{quantidadeSelecionado}</span>
    );

  const badgeAction = (canRender) => {
    if (canRender)
      return (
        <span
          className={`LivroListaItem__tag ${
            mode === ActionMode.DELETAR && "LivroListaItem__tag--deletar"
          }`}
        >
          { mode }
        </span>
      );
  };

  return (
    <div
      className={`LivroListaItem 
      ${mode !== ActionMode.NORMAL && "LivroListaItem--disable"}
      ${mode === ActionMode.DELETAR && "LivroListaItem--deletar"}`}
      onClick={() => clickItem(livro.id)}
    >
      {badgeCounter(quantidadeSelecionado, index)}
      {badgeAction(mode !== ActionMode.NORMAL)}
      <div>
        <div className="LivroListaItem__titulo">{livro.titulo}</div>
        <div className="LivroListaItem__autor">
          <b>Autor:</b> {livro.autor}
        </div>
        <div className="LivroListaItem__preco">
          R$: {livro.preco.toFixed(2)}
        </div>
        <div className="LivroListaItem__acoes Acoes">
          <button
            disabled={mode !== ActionMode.NORMAL}
            className={`Acoes__adicionar ${
              !quantidadeSelecionado && `Acoes__adicionar--preencher`
            }`}
            onClick={(e) => {
              e.stopPropagation();
              onAdd(index);
            }}
          >
            adicionar
          </button>
          {removeButton(quantidadeSelecionado, index)}
        </div>
      </div>
      <img
        className="LivroListaItem__capa"
        src={livro.capa}
        alt={`Capa livro ${livro.titulo}`}
      />
    </div>
  );
}
