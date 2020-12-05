const Insumos = require("../models/Insumos");

const listarProdutos = async (req, res) => {
  try {
    const produtos = await Insumos.findAll();
    return res.send(produtos);
  } catch (err) {
    return res
      .status(500)
      .send({ error: "Erro na consultar produtos " + err });
  }
};

const cadastrarProdutos = async (req, res) => {
  try {
    const {
      no_insumo,
      detalhes,
      dt_movimentacao,
      dt_validade,
      vr_unitario,
      fk_id_titular,
      quantidade,
    } = req.body;
    console.log(req.body);
    const novoProduto = await Insumos.create({
      no_insumo,
      detalhes,
      dt_movimentacao,
      dt_validade,
      vr_unitario,
      fk_id_titular,
      quantidade,
    });
    return res.send(novoProduto);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: "Erro ao cadatrar produtos " + err });
  }
};

const atualizarProutos = async (req, res) => {
  const {
    no_insumo,
      detalhes,
      dt_movimentacao,
      dt_validade,
      vr_unitario,
      fk_id_titular,
      quantidade,
  } = req.body;

  try {
    const TemProduto = await Insumos.findOne({ where: { id: req.params.id } });
    if (!TemProduto)
      return res.status(400).send({ error: "Produto não cadastrado" });
    const insumo = await Insumos.update(
      {
        no_insumo,
        detalhes,
        dt_movimentacao,
        dt_validade,
        vr_unitario,
        fk_id_titular,
        quantidade,
      },
      { where: { id: req.params.id } }
    );
    return res.send(insumo);
  } catch (err) {
    res.send("Erro ao atualizar Animal!" + err);
  }
};

const removerProduto = async (req, res) => {
  try {
    await Insumos.destroy({ where: { id: req.params.id } });
    res.send(`Produto removido com sucesso!`);
  } catch (err) {
    res.send("Erro ao remover o produto " + err);
  }
};

module.exports = { listarProdutos, cadastrarProdutos, atualizarProutos, removerProduto };
