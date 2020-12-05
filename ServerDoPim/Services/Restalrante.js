const Restalrante = require("../models/Restalrante");

const novoRestalrante = async (req, res) => {
  try {
    const { 
      no_restalrante, 
      fk_id_titular, 
      dt_cadastro 
    } = req.body;

    const restalrante = await Restalrante.create({
      no_restalrante, 
      fk_id_titular, 
      dt_cadastro 
    });

    return res.send(restalrante);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao cadastrar restalrante " + err });
  }
};

const atualizarRestalrante = async (req, res) => {
  const { 
    no_restalrante, 
    fk_id_titular, 
    dt_cadastro 
   } = req.body;

  try {
    const AcharRestalrante = await Restalrante.findOne({ where: { id: req.params.id } });
    if (!AcharRestalrante)
      return res.status(400).send({ error: "Restalrante não cadastrado!" });

    await Restalrante.update(
      {
        no_restalrante, 
        fk_id_titular, 
        dt_cadastro 
      },
      { where: { id: req.params.id } }
    );

    return res.send(req.body);
  } catch (err) {
    res.send("Erro Atualizar restalrante!" + err);
  }
};

module.exports = { novoRestalrante, atualizarRestalrante };
