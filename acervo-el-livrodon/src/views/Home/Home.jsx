import "./Home.css";
import "../../assets/styles/main.css";
import { LivroLista } from "../../components/LivroLista/Livrolista";
import { Navbar } from "../../components/Navbar/Navbar";
import { AdicionaEditaLivroModal } from "../../components/AdicionaEditaLivroModal/AdicionaEditaLivroModal";
import { useState } from "react";
import { ActionMode } from "../../constants/index";

//TODO criar o carrinho no backend 

export function Home() {
  const [canShowAdicionaLivroModal, setCanShowAdicionaLivroModal] =
    useState(false);

  const [livroParaAdicionar, setLivroParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [livroParaEditar, setLivroParaEditar] = useState();
  const [livroParaDeletar, setLivroParaDeletar] = useState();

  const handleDeleteLivro = (livroToDelete) => {
    setLivroParaDeletar(livroToDelete);
  }

  const handleUpdateLivro = (livroToUpdate) => {
    setLivroParaEditar(livroToUpdate);
    setCanShowAdicionaLivroModal(true);
  }

  const handleCloseModal = () => {
    setCanShowAdicionaLivroModal(false)
    setLivroParaAdicionar();
    setLivroParaDeletar();
    setLivroParaEditar();
  }

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createLivro={() => setCanShowAdicionaLivroModal(true)}
        updateLivro={() => handleActions(ActionMode.ATUALIZAR)}
      />
      <div className="Home__container">
        <LivroLista 
        mode={modoAtual}
        livroCriado={livroParaAdicionar}
        deleteLivro={handleDeleteLivro}
        updateLivro={handleUpdateLivro} />

        {canShowAdicionaLivroModal && (
          <AdicionaEditaLivroModal
            mode={modoAtual}
            livroToUpdate={livroParaEditar}
            closeModal={handleCloseModal}
            oneCreateLivro={(livro) => setLivroParaAdicionar(livro)}
          />
        )}
      </div>
    </div>
  );
}
