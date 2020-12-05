import { http } from "./config";

export default {
  listar: () => {
    return http.get("Movimentacoes/lista_movimentacoes");
  },

  criar: animalLote => {
    return http.post("Movimentacoes/nova_movimentacoes", animalLote);
  },

};
