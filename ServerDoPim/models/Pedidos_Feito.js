const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Pedidos = sequelize.define(
  "pedidos",
  {
    fk_id_prato: {
      type: Sequelize.INTEGER,
    },
    no_mesa: {
      type: Sequelize.STRING,
    },
    fk_id_titular: {
      type: Sequelize.INTEGER,
    },
    tipo_pedido: {
      type: Sequelize.INTEGER,
    },
    obs_pedido:{
      type: Sequelize.STRING
    },
    dt_criacao: {
      type: Sequelize.DATEONLY,
    },
    ic_pedido_ativo: {
      type: Sequelize.BOOLEAN,
    },
  },
  {
    timestamps: false,
    tableName: "pedidos",
  }
);

//Pedidos.sync({ force: true });

module.exports = Pedidos;
