const Movimentacoes  = require("../models/Movimentacoes");

const listarMovimentacoe = async (req, res) => {
  try {
    const movimentacao = await Movimentacoes.findAll();
    return res.send(movimentacao);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de movimentaçao " + err });
  }
};

const novaMovimentacao = async (req, res) => {
  try {
    const { 
      fk_id_produto,
      dt_movimentacao,
      tipo_movimentacao,
      fk_id_titular,
      quantidade
    } = req.body;

    const movimentacao = await Movimentacoes.create({
      fk_id_produto,
      dt_movimentacao,
      tipo_movimentacao,
      fk_id_titular,
      quantidade
    });

    return res.send(movimentacao);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao realizar monimrntação " + err });
  }
};



module.exports = { listarMovimentacoe, novaMovimentacao };
