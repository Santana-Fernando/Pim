const express = require("express");
const router = express.Router();

const restalrante = require("../Services/Restalrante");

router.post("/novo_estabelecimento", restalrante.novoRestalrante);
router.put("/editar_estabelecimento/:id", restalrante.atualizarRestalrante);

module.exports = router;
