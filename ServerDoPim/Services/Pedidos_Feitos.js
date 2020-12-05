const Pedidos_Feitos = require("../models/Pedidos_Feito");

const MostrarPedidos = async (req, res) => {
  try {
    const pedido = await Pedidos_Feitos.findAll();
    return res.send(pedido);
  } catch (err) {
    return res.status(500).send({ error: "Erro na consulta de pedidos " + err });
  }
};

const novoPedido = async (req, res) => {
  try {
    const { 
      fk_id_prato,
      no_mesa,
      fk_id_titular,
      tipo_pedido,
      obs_pedido,
      dt_criacao,
      ic_pedido_ativo
    } = req.body;

    const novoPedido = await Pedidos_Feitos.create({
      fk_id_prato,
      no_mesa,
      fk_id_titular,
      tipo_pedido,
      obs_pedido,
      dt_criacao,
      ic_pedido_ativo
    });

    return res.send(novoPedido);
  } catch (err) {
    return res.status(500).send({ error: "Erro ao criar novo pedido " + err });
  }
};

const editarPedido = async (req, res) => {
  const { 
    fk_id_prato,
    no_mesa,
    fk_id_titular,
    tipo_pedido,
    obs_pedido,
    dt_criacao,
    ic_pedido_ativo,
  } = req.body.pedido;
  console.log(req.body)
  try {
    const TemPedido = await Pedidos_Feitos.findOne({ where: { id: req.params.id } });
    if (!TemPedido) return res.status(400).send({ error: "Pedido não registrado!" });

    const pedido = await Pedidos_Feitos.update({
      fk_id_prato,
      no_mesa,
      fk_id_titular,
      tipo_pedido,
      obs_pedido,
      dt_criacao,
      ic_pedido_ativo
    },
    { where: { id: req.params.id } }
    );

    return res.send(pedido);
  } catch (err) {
    return res.send("Erro ao editar pedido! " + err);
  }
};

const deletar = async (req, res) => {
  try {
    await Pedidos_Feitos.destroy({ where: { id: req.params.id } });
    res.send(`Pedido deletado com sucesso!`);
  } catch (err) {
    res.send("Erro ao excluir pedido " + err);
  }
};

module.exports = { MostrarPedidos, novoPedido, editarPedido, deletar };
