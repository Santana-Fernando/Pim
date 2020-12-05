const express = require("express");
const { removerPrato } = require("../Services/Cardapio");
const router = express.Router();
const Cardapio = require("./Cardapio");
const Insumos = require("./Insumos")
const Movimentacoes = require("./Movimentacoes")
const Pedidos_Feitos = require("./Pedidos_Feitos")
const Restalrante = require("./Restalrante")
const usuario = require("./usuario")

router.use("/Cardapio", Cardapio);
router.use("/Insumos", Insumos);
router.use("/Movimentacoes", Movimentacoes);
router.use("/Pedidos_Feitos", Pedidos_Feitos);
router.use("/Restalrante", Restalrante);
router.use("/usuario", usuario);

module.exports = router;
