import { useState, useEffect, useCallback } from "react";
import { LivroListaItem } from "../LivroListaItem/LivroListaItem";
import { LivroService } from "../../services/LivrosService";
import { LivroDetalhesModal } from "../LivroDetalhesModal/LivroDetalhesModal";
import { matchByText } from "../../helpers/utils";
import "./LivroLista.css";
import { ActionMode } from "../../constants/index";

export function LivroLista({
  livroCriado,
  mode,
  updateLivro,
  deleteLivro,
  livroEditado,
  livroRemovido,
}) {
  const selecionadas = JSON.parse(localStorage.getItem('selecionadas')) ?? {};

  const [livros, setLivros] = useState([]);

  const [livrosFiltrados, setLivrosFiltrados] = useState([]);

  const [livroSelecionado, setLivroSelecionado] = useState(selecionadas);

  const [livroModal, setLivroModal] = useState(false);

  const onAdd = (livroIndex) => {
    const livro = {
      [livroIndex]: Number(livroSelecionado[livroIndex] || 0) + 1,
    };
    setLivroSelecionado({ ...livroSelecionado, ...livro });
  };

  const setSelecionadas = useCallback(() => {
    if (!livros.length) return;

    const entries = Object.entries(livroSelecionado);
    const sacola = entries.map((arr) => ({
      livroId: livros[arr[0]].id,
      quantidade: arr[1],
    }));

    localStorage.setItem('sacola', JSON.stringify(sacola));
    localStorage.setItem('selecionadas', JSON.stringify(livroSelecionado));
  }, [livroSelecionado, livros]);

  const onRemove = (livroIndex) => {
    const livro = {
      [livroIndex]: Number(livroSelecionado[livroIndex] || 0) - 1,
    };
    setLivroSelecionado({ ...livroSelecionado, ...livro });
  };

  const getLista = async () => {
    const response = await LivroService.getLista();
    setLivros(response);
  };

  const getLivroById = async (livroId) => {
    const response = await LivroService.getById(livroId);

    const mapper = {
      [ActionMode.NORMAL]: () => setLivroModal(response),
      [ActionMode.ATUALIZAR]: () => updateLivro(response),
      [ActionMode.DELETAR]: () => deleteLivro(response),
    };

    mapper[mode]();
  };

  useEffect(() => {
    getLista();
  }, [livroEditado, livroRemovido]);

  const adicionaLivroNaLista = useCallback(
    (livro) => {
      const lista = [...livros, livro];
      setLivros(lista);
    },
    [livros]
  );

  const filtroPorTitulo = ({ target }) => {
    const lista = [...livros].filter(({ titulo }) =>
      matchByText(titulo, target.value)
    );
    setLivrosFiltrados(lista);
  };

  useEffect(() => {
    setSelecionadas();
  }, [setSelecionadas, livroSelecionado]);

  useEffect(() => {
    if (livroCriado && !livros.map(({ id }) => id).includes(livroCriado.id)) {
      adicionaLivroNaLista(livroCriado);
    }
    setLivrosFiltrados(livros);
  }, [adicionaLivroNaLista, livroCriado, livros]);

  return (
    <div className="LivroLista-Wrapper">
      <input
        className="LivroLista-filtro"
        onChange={filtroPorTitulo}
        placeholder="Busque um livro pelo Título"
      />

      <div className="LivroLista">
        {livrosFiltrados.map((livro, index) => (
          <LivroListaItem
            mode={mode}
            key={`LivroListaItem-${index}`}
            livro={livro}
            quantidadeSelecionado={livroSelecionado[index]}
            index={index}
            onAdd={(index) => onAdd(index)}
            onRemove={(index) => {
              onRemove(index);
            }}
            clickItem={(livroId) => getLivroById(livroId)}
          />
        ))}
        {livroModal && (
          <LivroDetalhesModal
            livro={livroModal}
            closeModal={() => setLivroModal(false)}
          />
        )}
      </div>
    </div>
  );
}
