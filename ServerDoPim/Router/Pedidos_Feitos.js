const express = require("express");
const router = express.Router();

const pedidos = require("../Services/Pedidos_Feitos");

router.get("/mostrar_pedidos", pedidos.MostrarPedidos);
router.post("/novo_pedidos", pedidos.novoPedido);
router.put("/editar_pedidos/:id", pedidos.editarPedido);
router.delete("/remover_pedidos/:id", pedidos.deletar);

module.exports = router;
