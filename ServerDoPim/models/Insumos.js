const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Insumos = sequelize.define(
  "insumos",
  {
    no_insumo: {
      type: Sequelize.STRING,
    },
    detalhes: {
      type: Sequelize.STRING,
    },
    dt_movimentacao: {
      type: Sequelize.STRING,
    },
    dt_validade: {
      type: Sequelize.DATEONLY,
    },
    vr_unitario: {
      type: Sequelize.BOOLEAN,
    },
    fk_id_titular: {
      type: Sequelize.INTEGER,
    },
    quantidade: {
      type: Sequelize.INTEGER,
    },
  },
  {
    timestamps: false,
    tableName: "insumos",
  }
);

//Insumos.sync({ force: true });

module.exports = Insumos;
