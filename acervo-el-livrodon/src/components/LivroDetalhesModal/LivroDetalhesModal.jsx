import "./LivroDetalhesModal.css";
import { Modal } from "../Modal/modal"

export function LivroDetalhesModal({livro, closeModal}) {
    return (
        <Modal closeModal={closeModal}>
            <div className="LivroDetalhesModal">
                <div>
                    <div className="LivroDetalhesModal__titulo">{livro.titulo}</div>
                    <div className="LivroDetalhesModal__autor"> <b>Autor:</b> {livro.autor}</div>
                    <div className="LivroDetalhesModal__preco">{Number(livro.preco).toFixed(2)}</div>
                    <div className="LivroDetalhesModal__descricao"><b>Descrição:</b> {livro.descricao}</div>
                </div>
                <img src={livro.capa} alt={`Capa do livro ${livro.titulo}`} className="LivroDetalhesModal__capa" />
            </div>
        </Modal>
    );
}