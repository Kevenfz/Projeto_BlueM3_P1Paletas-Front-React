import "./Home.css";
import "../../assets/styles/main.css";
import { LivroLista } from "../../components/LivroLista/Livrolista";
import { Navbar } from "../../components/Navbar/Navbar";
import { AdicionaEditaLivroModal } from "../../components/AdicionaEditaLivroModal/AdicionaEditaLivroModal";
import { useState } from "react";
import { ActionMode } from "../../constants/index";
import { DeletaLivroModal } from "../../components/DeletaLivroModal/DeletaLivroModal";
import { SacolaModal } from "../../components/SacolaModal/SacolaModal";
import { SacolaService } from "../../services/SacolaService";

export function Home() {
  const [canOpenBag, setCanOpenBag] = useState();

  const [livroEditado, setLivroEditado] = useState();

  const [canShowAdicionaLivroModal, setCanShowAdicionaLivroModal] =
    useState(false);

  const [livroParaAdicionar, setLivroParaAdicionar] = useState();

  const [livroRemovido, setLivroRemovido] = useState();

  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  };

  const [livroParaEditar, setLivroParaEditar] = useState();

  const [livroParaDeletar, setLivroParaDeletar] = useState();

  const handleDeleteLivro = (livroToDelete) => {
    setLivroParaDeletar(livroToDelete);
  };

  const handleUpdateLivro = (livroToUpdate) => {
    setLivroParaEditar(livroToUpdate);
    setCanShowAdicionaLivroModal(true);
  };

  const abriSacola = async () => {
    const lista = JSON.stringify(localStorage.getItem("sacola"));
    const sacola = lista.filter((i) => i.quantidade > 0);

    await SacolaService.create(sacola)

    setCanOpenBag(true)
  };

  const handleCloseModal = () => {
    setCanShowAdicionaLivroModal(false);
    setLivroParaAdicionar();
    setLivroParaDeletar();
    setLivroParaEditar();
    setModoAtual(ActionMode.NORMAL);
  };

  return (
    <div className="Home">
      <Navbar
        mode={modoAtual}
        createLivro={() => setCanShowAdicionaLivroModal(true)}
        updateLivro={() => handleActions(ActionMode.ATUALIZAR)}
        deleteLivro={() => handleActions(ActionMode.DELETAR)}
        openBag={abriSacola}
      />
      <div className="Home__container">
        <LivroLista
          mode={modoAtual}
          livroCriado={livroParaAdicionar}
          livroEditado={livroEditado}
          deleteLivro={handleDeleteLivro}
          updateLivro={handleUpdateLivro}
          livroRemovido={livroRemovido}
        />

        {canShowAdicionaLivroModal && (
          <AdicionaEditaLivroModal
            mode={modoAtual}
            livroToUpdate={livroParaEditar}
            onUpdateLivro={(livro) => setLivroEditado(livro)}
            closeModal={handleCloseModal}
            oneCreateLivro={(livro) => setLivroParaAdicionar(livro)}
          />
        )}
        {livroParaDeletar && (
          <DeletaLivroModal
            livroParaDeletar={livroParaDeletar}
            closeModal={handleCloseModal}
            onDeletelivro={(livro) => setLivroRemovido(livro)}
          />
        )}
        {
          canOpenBag &&
          <SacolaModal closeModal={() => setCanOpenBag(false)} />
        }
      </div>
    </div>
  );
}
