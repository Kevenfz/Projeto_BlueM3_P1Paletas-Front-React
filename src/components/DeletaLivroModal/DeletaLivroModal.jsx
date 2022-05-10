import "./DeletaLivroModal.css";
import { Modal } from "../Modal/modal";
import { LivroService } from "../../services/LivrosService";

export function DeletaLivroModal({ closeModal, livroParaDeletar, onDeleteLivro }) {
    
  const handleDelete = async (livro) => {
    await LivroService.deleteById(livro._id);
    onDeleteLivro(livro);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="DeletaLivroModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover <b>{livroParaDeletar.titulo}</b> do
          acervo?
        </p>

        <img
          className="DeletaLivroModal__capa"
          src={livroParaDeletar.capa}
          alt={livroParaDeletar.titulo}
        />
        <label className="DeletaLivroModal__descricao" htmlFor="">{livroParaDeletar.descricao}</label>

        <br />

        <div>
          <button
            onClick={() => handleDelete(livroParaDeletar)}
            className="DeletaLivroModal__confirmar"
          >
            Confirmar
          </button>
          <button onClick={closeModal} className="DeletaLivroModal__cancelar">
            Cancelar
          </button>
        </div>
      </div>
    </Modal>
  );
}
