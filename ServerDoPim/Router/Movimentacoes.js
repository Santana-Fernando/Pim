const express = require("express");
const router = express.Router();

const movimentacoes = require("../Services/Movimentacoes");

router.get("/lista_movimentacoes", movimentacoes.listarMovimentacoe);
router.post("/nova_movimentacoes", movimentacoes.novaMovimentacao);
module.exports = router;
