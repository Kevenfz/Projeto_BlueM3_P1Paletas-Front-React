import { useState, useEffect } from "react";
import "./LivroLista.css";
import { LivroListaItem } from "../LivroListaItem/LivroListaItem";
import { LivroService } from "../../services/LivrosService";
import { LivroDetalhesModal } from "../LivroDetalhesModal/LivroDetalhesModal";

export function LivroLista() {
  const [livros, setLivros] = useState([]);
  const [livroSelecionado, setLivroSelecionado] = useState({});
  const [livroModal, setLivroModal] = useState(false);

  const getLista = async () => {
    const response = await LivroService.getLista();
    setLivros(response);
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

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="LivroLista">
      {livros.map((livro, index) => (
        <LivroListaItem
          key={`LivroListaItem-${index}`}
          livro={livro}
          quantidadeSelecionado={livroSelecionado[index]}
          index={index}
          onAdd={(index) => onAdd(index)}
          onRemove={(index) => onRemove(index)}
        />
      ))}
      {livroModal && <LivroDetalhesModal livro={livroModal} closeModal={() => setLivroModal(false)} />}
    </div>
  );
}
