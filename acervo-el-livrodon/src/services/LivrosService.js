import { Api } from "../helpers/Api";

const parseResponse = (response) => response.json();

export const LivroService = {
  getLista: () =>
    fetch(Api.livroLista(), { method: "GET" }).then(parseTransformLista),

  getById: (id) =>
    fetch(Api.livroById(), { method: "GET" }).then(parseResponse),

  create: () =>
    fetch(Api.createLivro(), { method: "POST" }).then(parseResponse),

  update: (id) =>
    fetch(Api.updateLivroById(), { method: "PUT" }).then(parseResponse),

  delete: (id) =>
    fetch(Api.deleteLivroById(), { method: "DELETE" }).then(parseResponse),
};

const transformLivro = (livro) => {
  //TODO refatorar para adicionar se possui brinde ou não
  // const [brinde] = livro.brinde.push()

  return {
    ...livro,
    id: livro._id,
    // ...(brinde),
    // possuiBrinde: Boolean(brinde)
  };
};

const parseTransformLista = (response) =>
  parseResponse(response).then((livros) => livros.map(transformLivro));

// const parseTransformItem = (response) => parseResponse(response).then(transformLivro);