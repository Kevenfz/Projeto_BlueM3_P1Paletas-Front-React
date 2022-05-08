import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

export const LivroService = {
  getLista: () =>
    fetch(Api.livroLista(), { method: "GET" }).then(parseTransformLista),

  getById: (id) =>
    fetch(Api.livroById(id), { method: "GET" }).then(parseTransformItem),

  create: (livro) =>
    fetch(Api.createLivro(), {
      method: "POST",
      body: JSON.stringify(livro),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),

  updtateById: (id, livro) =>
    fetch(Api.updateLivroById(id), {
      method: "PUT",
      body: JSON.stringify(livro),
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(parseResponse),

    deleteById: (id) =>
    fetch(Api.deleteLivroById(id), { method: "DELETE" }).then(parseResponse),
};

const transformLivro = (livro) => {
  return {
    ...livro,
    id: livro._id,
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((livros) => livros.map(transformLivro));

const parseTransformItem = (response) =>
  parseResponse(response).then(transformLivro);
