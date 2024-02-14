export const gravarDados = (dados) => ({
  type: "GRAVAR_DADOS",
  payload: dados,
});

export const lerDados = () => ({
  type: "LER_DADOS",
});
