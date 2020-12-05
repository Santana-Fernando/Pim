import { http } from "./config";

export default {
  listar: () => {
    return http.get("Insumos/lista_de_insumos");
  },

  criar: produto => {
    return http.post("Insumos/novo_produto", produto);
  },

  atualizar: (id, produto) => {
    return http.put(`Insumos/editar_produto/${id}`, produto);
  },

  deletar: id => {
    return http.delete(`Insumos/deleta_produto/${id}`);
  }
};
