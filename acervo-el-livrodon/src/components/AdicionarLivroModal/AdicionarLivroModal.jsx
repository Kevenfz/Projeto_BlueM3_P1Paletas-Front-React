import { useState, useEffect } from "react";
import { Modal } from "../Modal/modal";
import { LivroService } from "../../services/LivrosService";
import "./AdicionarLivroModal.css";
//TODO ADICIONAR O CSS

export function AdicionaLivroModal({ closeModal, oneCreateLivro }) {
  const form = {
    titulo: "",
    autor: "",
    preco: "",
    capa: "",
    descricao: "",
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const [canDisable, setCanDisable] = useState(true);

  const canDisableSendButton = () => {
    const response = !Boolean(
      state.titulo.length &&
        state.autor.length &&
        state.preco.length &&
        state.capa.length &&
        state.descricao.length
    );

    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const createLivro = async () => {
    const renomeiaCaminhoCapa = (capaPath) => capaPath.split("\\").pop();

    const { titulo, autor, preco, capa, descricao } = state;

    const livro = {
      titulo,
      autor,
      preco,
      capa: `assets/img/${renomeiaCaminhoCapa(capa)}`,
      descricao,
    };

    const response = await LivroService.create(livro);
    oneCreateLivro(response);
    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaLivroModal">
        <form autocomplete="off">
          <h2> Adicionar ao Acervo </h2>
          <div>
            <label className="AdicionaLivroModal__text" htmlFor="titulo">
              {" "}
              <b>Titulo:</b>{" "}
            </label>
            <input
              id="titulo"
              placeholder="Titulo do livro"
              type="text"
              value={state.titulo}
              onChange={(e) => handleChange(e, "titulo")}
            />
          </div>
          <div>
            <label className="AdicionaLivroModal__text" htmlFor="autor">
              {" "}
              <b>Autor:</b>{" "}
            </label>
            <input
              id="autor"
              placeholder="Autor do livro"
              type="text"
              value={state.autor}
              onChange={(e) => handleChange(e, "autor")}
            />
          </div>

          <div>
            <label className="AdicionaLivroModal__text" htmlFor="preco">
              {" "}
              <b>Preço:</b>{" "}
            </label>
            <input
              id="preco"
              placeholder="40,00"
              type="text"
              value={state.preco}
              onChange={(e) => handleChange(e, "preco")}
            />
          </div>

          <div>
            <label className="AdicionaLivroModal__text" htmlFor="descricao">
              {" "}
              <b>Descrição:</b>{" "}
            </label>
            <input
              id="descricao"
              placeholder="Resumo da obra"
              type="text"
              value={state.descricao}
              onChange={(e) => handleChange(e, "descricao")}
            />
          </div>

          <div>
            <label
              className="AdicionaLivroModal__text  AdicionaLivroModal__capa-label"
              htmlFor="capa"
            >
              {!state.capa.length ? "Selecionar Imagem" : state.capa}
            </label>
            <input
              className=" AdicionaLivroModal__capa"
              id="capa"
              type="file"
              accept="image/png, image/gif, image/jpeg"
              value={state.capa}
              onChange={(e) => handleChange(e, "capa")}
            />
          </div>

          <button
            className="AdicionaLivroModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={createLivro}
          >
            Enviar
          </button>
        </form>
      </div>
    </Modal>
  );
}
