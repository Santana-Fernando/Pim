const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Movimentacao = sequelize.define(
  "movimentacao",
  {
    fk_id_produto: {
      type: Sequelize.INTEGER,
    },
    dt_movimentacao: {
      type: Sequelize.DATEONLY,
    },
    tipo_movimentacao: {
      type: Sequelize.INTEGER,
    },
    fk_id_titular: {
      type: Sequelize.INTEGER,
    },
    quantidade:{
      type: Sequelize.INTEGER
    }
  },
  {
    timestamps: false,
    tableName: "movimentacao",
  }
);

//Movimentacao.sync({ force: true });

module.exports = Movimentacao;
