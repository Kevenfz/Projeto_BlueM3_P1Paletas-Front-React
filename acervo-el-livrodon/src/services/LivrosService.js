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

  update: (id) =>
    fetch(Api.updateLivroById(), { method: "PUT" }).then(parseResponse),

  delete: (id) =>
    fetch(Api.deleteLivroById(), { method: "DELETE" }).then(parseResponse),
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
