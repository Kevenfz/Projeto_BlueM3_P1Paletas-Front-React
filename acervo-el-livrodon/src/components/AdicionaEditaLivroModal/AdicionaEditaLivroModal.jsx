import { useState, useEffect } from "react";
import { Modal } from "../Modal/modal";
import { LivroService } from "../../services/LivrosService";
import "./AdicionaEditaLivroModal.css";
import { ActionMode } from "../../constants/index";

export function AdicionaEditaLivroModal({
  closeModal,
  onCreateLivro,
  mode,
  livroToUpdate,
  onUpdateLivro,
}) {
  const form = {
    titulo: livroToUpdate?.titulo ?? "",
    autor: livroToUpdate?.autor ?? "",
    preco: livroToUpdate?.preco ?? "",
    capa: livroToUpdate?.capa ?? "",
    descricao: livroToUpdate?.descricao ?? "",
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
        String(state.preco).length &&
        state.capa.length &&
        state.descricao.length
    );

    setCanDisable(response);
  };

  useEffect(() => {
    canDisableSendButton();
  });

  const handleSend = async () => {
    const renomeiaCaminhoCapa = (capaPath) => capaPath.split("/\\|//").pop();

    const { titulo, autor, preco, capa, descricao } = state;

    const livro = {
      ...(livroToUpdate && { _id: livroToUpdate?.id }),
      titulo,
      autor,
      preco,
      capa: `assets/img/${renomeiaCaminhoCapa(capa)}`,
      descricao,
    };

    const serviceCall = {
      [ActionMode.NORMAL]: () => LivroService.create(livro),
      [ActionMode.ATUALIZAR]: () =>
        LivroService.updtateById(livroToUpdate?.id, livro),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreateLivro(response),
      [ActionMode.ATUALIZAR]: () => onUpdateLivro(response),
    };

    actionResponse[mode]();

    const reset = {
      titulo: "",
      autor: "",
      preco: "",
      capa: "",
      descricao: "",
    };

    setState(reset);

    closeModal();
  };

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaLivroModal">
        <form autocomplete="off">
          <h2>
            {" "}
            {ActionMode.ATUALIZAR === mode ? "Atualizar" : "Adicionar ao"}{" "}
            Acervo{" "}
          </h2>
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
              onChange={(e) => handleChange(e, "capa")}
            />
          </div>

          <button
            className="AdicionaLivroModal__enviar"
            type="button"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? "Enviar" : "Atualizar"}
          </button>
        </form>
      </div>
    </Modal>
  );
}
