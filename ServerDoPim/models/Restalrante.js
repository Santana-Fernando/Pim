const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Restalrante = sequelize.define(
  "restalrante",
  {
    no_restalrante: {
      type: Sequelize.STRING,
    },
    fk_id_titular: {
      type: Sequelize.INTEGER,
    },
    dt_cadastro: {
      type: Sequelize.DATE,
    }
  },
  {
    timestamps: false,
    tableName: "restalrante",
  }
);

//Restalrante.sync({ force: true });

module.exports = Restalrante;
