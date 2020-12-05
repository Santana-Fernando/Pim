const express = require("express");
const router = express.Router();

const cardapio = require("../Services/Cardapio");

router.get("/listar_cardapio", cardapio.listarCardario);
router.post("/novo_prato", cardapio.novoPrato);
router.put("/editar_prato/:id", cardapio.atualizarPrato);
router.delete("/remover_prato/:id", cardapio.removerPrato);

module.exports = router;
