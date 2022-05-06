import { useState, useEffect } from "react";
import "./LivroLista.css";
import { LivroListaItem } from "../LivroListaItem/LivroListaItem";
import { LivroService } from "../../services/LivrosService";
import { LivroDetalhesModal } from "../LivroDetalhesModal/LivroDetalhesModal";

export function LivroLista({ livroCriado, mode }) {
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
    setLivroModal(response);
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

  const adicionaLivroNaLista = (livro) => {
    const lista = [...livros, livro];
    setLivros(lista);
  };

  useEffect(() => {
    if (livroCriado) adicionaLivroNaLista(livroCriado);
  }, [livroCriado]);

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
