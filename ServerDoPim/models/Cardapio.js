const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Cardapio = sequelize.define(
  "cardapio",
  {
    no_prato: {
      type: Sequelize.STRING,
    },
    desc_prato: {
      type: Sequelize.STRING,
    },
    fk_id_titular: {
      type: Sequelize.INTEGER,
    },
    dt_criacao: {
      type: Sequelize.DATEONLY,
    }
  },
  {
    timestamps: false,
    tableName: "cardapio",
  }
);

//Cardapio.sync({ force: true });

module.exports = Cardapio;
