const LivroContext = {
  livroEndpoint: () => `${Api.baseUrl}/livros`,
  livroLista: () => `${LivroContext.livroEndpoint()}/all-livros`,
  livroById: (id) => `${LivroContext.livroEndpoint()}/one-livro/${id}`,
  createLivro: () => `${LivroContext.livroEndpoint()}/create-livro`,
  updateLivroById: (id) => `${LivroContext.livroEndpoint()}/update-livro/${id}`,
  deleteLivroById: (id) => `${LivroContext.livroEndpoint()}/delete-livro/${id}`,
};

const SacolaContext = {
  getSacola: () => `${LivroContext.livroEndpoint()}/all-carrinho`,
  createSacola: () => `${LivroContext.livroEndpoint()}/create-carrinho`,
  purchase: () => `${LivroContext.livroEndpoint()}/finish-carrinho`,
};

export const Api = {
  baseUrl: "https://api-ellivrodon.onrender.com",
  ...LivroContext,
  ...SacolaContext,
};
