import { http } from "./config";

export default {

  listar: () => {
    return http.get("Pedidos_Feitos/mostrar_pedidos");
  },

  criar: pedido => {
    return http.post("Pedidos_Feitos/novo_pedidos", pedido);
  },

  atualizar: (id, pedido) => {
    return http.put(`Pedidos_Feitos/editar_pedidos/${id}`, { pedido });
  },

  deletar: id => {
    return http.delete(`Pedidos_Feitos/remover_pedidos/${id}`);
  }
};
