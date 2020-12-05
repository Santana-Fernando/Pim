const Sequelize = require("sequelize");
const sequelize = require("../config/conection");

const Usuario = sequelize.define(
  "usuario",
  {
    no_pessoa: {
      type: Sequelize.STRING,
    },
    cpf_cnpj: {
      type: Sequelize.INTEGER,
    },
    dt_nascimento: {
      type: Sequelize.DATE,
    },
    no_empresa: {
      type: Sequelize.STRING,
    },
    dt_cadastro: {
      type: Sequelize.DATE,
    },
    fk_id_Restalrante: {
      type: Sequelize.INTEGER,
    },
    senha: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false,
    tableName: "usuario",
  }

)

//Usuario.sync({ force: true });

module.exports = Usuario;
