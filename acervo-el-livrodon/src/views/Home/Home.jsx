import "./Home.css";
import "../../assets/styles/main.css";
import { LivroLista } from "../../components/LivroLista/Livrolista";
import { Navbar } from "../../components/Navbar/Navbar";
import { AdicionaEditaLivroModal } from "../../components/AdicionaEditaLivroModal/AdicionaEditaLivroModal";
import { useState } from "react";
import { ActionMode } from "../../constants/index";

export function Home() {
  const [canShowAdicionaLivroModal, setCanShowAdicionaLivroModal] =
    useState(false);

  const [livroParaAdicionar, setLivroParaAdicionar] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

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
        livroCriado={livroParaAdicionar} />

        {canShowAdicionaLivroModal && (
          <AdicionaEditaLivroModal
            closeModal={() => setCanShowAdicionaLivroModal(false)}
            oneCreateLivro={(livro) => setLivroParaAdicionar(livro)}
          />
        )}
      </div>
    </div>
  );
}
