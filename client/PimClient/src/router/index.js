import Vue from "vue";
import Router from "vue-router";

import Home from "../components/Home";
import Cardapio from "../components/Cardapio";
import Pedido from "../components/Pedido";
import Movimentacoes from "../components/Movimentacoes";
import insumos from "../components/Insumos";

Vue.use(Router);

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/cardapio",
    component: Cardapio
  },
  {
    path: "/pedido",
    component: Pedido
  },
  {
    path: "/movimentacao",
    component: Movimentacoes
  },
  {
    path: "/insumo",
    component: insumos
  }
];

const router = new Router({ routes });
export default router;
