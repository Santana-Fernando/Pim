import { http } from "./config";

export default {

  listar: () => {
    return http.get("cardapio/listar_cardapio");
  },

  criar: prato => {
    return http.post("cardapio/novo_prato", prato);
  },

  atualizar: (id, prato) => {
    return http.put(`cardapio/editar_prato/${id}`, prato);
  },

  deletar: (id) => {
    return http.delete(`cardapio/remover_prato/${id}`);
  }
};
