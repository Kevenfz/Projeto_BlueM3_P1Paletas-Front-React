import "./Home.css";
import "../../assets/styles/main.css";
import { LivroLista } from "../../components/LivroLista/Livrolista";
import { Navbar } from "../../components/Navbar/Navbar";
import { AdicionaLivroModal } from "../../components/AdicionarLivroModal/AdicionarLivroModal";
import { useState } from "react";

export function Home() {
  const [canShowAdicionaLivroModal, setCanShowAdicionaLivroModal] =
    useState(false);

  const [livroParaAdicionar, setLivroParaAdicionar] = useState();

  return (
    <div className="Home">
      <Navbar createLivro={() => setCanShowAdicionaLivroModal(true)} />
      <div className="Home__container">
        <LivroLista livroCriado={livroParaAdicionar}/>

        {
          canShowAdicionaLivroModal && (
            <AdicionaLivroModal
              closeModal={() => setCanShowAdicionaLivroModal(false)}
              oneCreateLivro={(livro) => setLivroParaAdicionar(livro)}
            />
        )}
      </div>
    </div>
  );
}
