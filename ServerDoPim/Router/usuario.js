const express = require("express");
const router = express.Router();

const usuario = require("../Services/usuario");

router.post("/novo_usuario", usuario.novoCadastro);
router.put("/atualizar_usuario/:id", usuario.atualizarUsuario);

module.exports = router;
