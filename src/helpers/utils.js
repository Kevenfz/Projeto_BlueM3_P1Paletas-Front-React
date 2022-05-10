export const NormalizeUtils = (str) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export const matchByText = (serachedText, title) =>
  NormalizeUtils(serachedText).includes(NormalizeUtils(title));
