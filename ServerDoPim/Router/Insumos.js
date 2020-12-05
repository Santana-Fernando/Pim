const express = require("express");
const router = express.Router();

const insumos = require("../Services/Insumos");

router.get("/lista_de_insumos", insumos.listarProdutos);
router.post("/novo_produto", insumos.cadastrarProdutos);
router.put("/editar_produto/:id", insumos.atualizarProutos);
router.delete("/deleta_produto/:id", insumos.removerProduto);

module.exports = router;
