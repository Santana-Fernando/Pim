const Cardapio = require("../models/Cardapio");

const listarCardario = async (req, res) => {
  try {
    const cardapio = await Cardapio.findAll();
    return res.send(cardapio);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na ao trazer os pratos " + err });
  }
};

const novoPrato = async (req, res) => {
  try {
    const {
      no_prato,
      desc_prato,
      fk_id_titular,
      dt_criacao
    } = req.body;

    const cardapio = await Cardapio.create({
      no_prato,
      desc_prato,
      fk_id_titular,
      dt_criacao
    });

    return res.send(cardapio);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao cadatrar o novo Prato " + err });
  }
};

const atualizarPrato = async (req, res) => {
  const {
    no_prato,
    desc_prato,
    fk_id_titular,
    dt_criacao
  } = req.body;
  try {
    const AcharPrato = await Cardapio.findOne({
      where: { id: req.params.id },
    });
    if (!AcharPrato) return res.status(400).send({ error: "Prato não registrado!" });

    const prato = await Cardapio.update(
      {
        no_prato,
        desc_prato,
        fk_id_titular,
        dt_criacao
      },
      { where: { id: req.params.id } }
    );

    return res.send(prato);
  } catch (err) {
    res.send("Erro ao atualizar Prato!" + err);
  }
};

const removerPrato = async (req, res) => {
  try {
    await Cardapio.destroy({ where: { id: req.params.id } });
    res.send(`Prato removido com sucesso!`);
  } catch (err) {
    res.send("Erro ao remover prato " + err);
  }
};

module.exports = { listarCardario, novoPrato, atualizarPrato, removerPrato };
