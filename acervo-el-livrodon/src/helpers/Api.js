const LivroContext = {
  livroEndpoint: () => `${Api.baseUrl}/livros`,
  livroLista: () => `${LivroContext.livroEndpoint()}/all-livros`,
  livroById: (id) => `${LivroContext.livroEndpoint()}/one-livro/${id}`,
  createLivro: () => `${LivroContext.livroEndpoint()}/create-livro`,
  updateLivroById: (id) => `${LivroContext.livroEndpoint()}/update-livro/${id}`,
  deleteLivroById: (id) => `${LivroContext.livroEndpoint()}/delete-livro/${id}`,
};

export const Api = {
  baseUrl: "http://localhost:3333",
  ...LivroContext,
};
