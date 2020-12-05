const Usuario = require("../models/usuario");

const novoCadastro = async (req, res) => {
  try {
    const { 
      no_pessoa, 
      cpf_cnpj, 
      dt_nascimento, 
      no_empresa, 
      dt_cadastro, 
      fk_id_Restalrante 
    } = req.body;

    const pessoa = await Usuario.create({
      no_pessoa, 
      cpf_cnpj, 
      dt_nascimento, 
      no_empresa, 
      dt_cadastro, 
      fk_id_Restalrante
    });

    return res.send(pessoa);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao criar usuário " + err });
  }
};

const atualizarUsuario = async (req, res) => {
  const { 
    no_pessoa, 
    cpf_cnpj, 
    dt_nascimento, 
    no_empresa, 
    dt_cadastro, 
    fk_id_Restalrante  
  } = req.body;

  let pessoa = {
    no_pessoa, 
      cpf_cnpj, 
      dt_nascimento, 
      no_empresa, 
      dt_cadastro, 
      fk_id_Restalrante 
  };
  try {
    await Usuario.update(pessoa, { where: { id: req.params.id } });
    return res.send(req.body);
  } catch (err) {
    res.send("Erro ao atualizar usuário!" + err);
  }
};


module.exports = { novoCadastro, atualizarUsuario };
