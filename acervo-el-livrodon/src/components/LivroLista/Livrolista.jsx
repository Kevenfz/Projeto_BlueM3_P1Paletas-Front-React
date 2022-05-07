import { useState, useEffect, useCallback } from "react";
import "./LivroLista.css";
import { LivroListaItem } from "../LivroListaItem/LivroListaItem";
import { LivroService } from "../../services/LivrosService";
import { LivroDetalhesModal } from "../LivroDetalhesModal/LivroDetalhesModal";
import { ActionMode } from "../../constants/index";

export function LivroLista({ livroCriado, mode, updateLivro, deleteLivro }) {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState({});
  const [livroModal, setLivroModal] = useState(false);

  //função que busca os dados da nosso backend uma vez
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

  const onAdd = (livroIndex) => {
    const livro = {
      [livroIndex]: Number(livroSelecionado[livroIndex] || 0) + 1,
    };
    setLivroSelecionado({ ...livroSelecionado, ...livro });
  };

  const onRemove = (livroIndex) => {
    const livro = {
      [livroIndex]: Number(livroSelecionado[livroIndex] || 0) - 1,
    };
    setLivroSelecionado({ ...livroSelecionado, ...livro });
  };

  const adicionaLivroNaLista = useCallback(
    (livro) => {
      const lista = [...livros, livro];
      setLivros(lista);
    },
    [livros]
  );

  useEffect(() => {
    if (livroCriado && !livros.map(({ id }) => id).includes(livroCriado.id)) {
      adicionaLivroNaLista(livroCriado);
    }
  }, [adicionaLivroNaLista, livroCriado, livros]);

  //Executa a função que busca os dados da nosso backend uma vez
  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="LivroLista">
      {livros.map((livro, index) => (
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
  );
}
