<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="secondary">
      <b-navbar-brand>
        <h1>Movimentação de Insumos</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;" id="pessoa">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <br />
    <br />
    <section id="Body">
      <label>Produto:</label>
      <b-form-select v-model="movimentacao.fk_id_produto">
        <b-form-select-option
          :value="produto.id"
          v-for="produto of produtos"
          :key="produto.id"
        >{{ produto.no_insumo }}</b-form-select-option>
      </b-form-select>
      <label>Data de Movimentação:</label>
      <b-form-input v-model="movimentacao.dt_movimentacao" :type="types[1]"></b-form-input>
      <label>Tipo de Movimentação:</label>
      <b-form-select v-model="movimentacao.tipo_movimentacao">
        <b-form-select-option :value="1" >Entrada</b-form-select-option>
        <b-form-select-option :value="2" >Saída</b-form-select-option>
      </b-form-select>
      <label>Titular:</label>
      <b-form-select v-model="movimentacao.fk_id_titular">
        <b-form-select-option :value="1">Pessoa Física</b-form-select-option>
        <b-form-select-option :value="2">Pessoa Jurídica</b-form-select-option>
      </b-form-select>
      <label>Quantidade:</label>
      <b-form-input v-model="movimentacao.quantidade" :type="types[0]"></b-form-input>
      <br />
      <br />
      <b-button
        @click="addMovimentacao()"
        variant="outline-light"
        style="width: 100px;"
        id="CadastroP"
      >
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>
    <h1 style="text-align: center;">Movimentações Feitas</h1>
    <section id="Lista">
      <b-list-group>
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Produto</td>
            <td>Data da Movimentação</td>
            <td>Tipo de Movimentação</td>
            <td>Titular</td>
            <td>Qunatidade</td>
          </tr>
          <tr
            style="background-color: white;"
            v-for="movimentacao of movimentacoes"
            :key="movimentacao.id"
          >
            <td>{{movimentacao.fk_id_produto}}</td>
            <td>{{formatar(movimentacao.dt_movimentacao, movimentacao)}}</td>
            <td>{{movimentacao.tipo_movimentacao == 1? "Entrada" : "Saida"}}</td>
            <td>{{movimentacao.fk_id_titular == 1 ? "Pessoa Física" : "Pessoa Jurídica"}}</td>
            <td>{{movimentacao.quantidade}}</td>
          </tr>
        </table>
      </b-list-group>
    </section>
  </div>
</template>

<script>
import Movimentacao from "../services/movimentacao";
import Insumo from "../services/insumo";
export default {
  name: "app",
  data() {
    return {
      movimentacao: {
        fk_id_produto: "",
        dt_movimentacao: "",
        tipo_movimentacao: "",
        fk_id_titular: "",
        quantidade: ""
      },
      produto: {
        id: "",
        no_insumo: ""
      },
      movimentacoes:[],
      produtos:[],
      types: ["number", "date"],
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listarProduto() {
      Insumo.listar().then(res => {
        this.produtos = res.data;
      });
    },
    listar() {
      Movimentacao.listar().then(res => {
        this.movimentacoes = res.data;
      });
    },
    formatar(datas, movimentacao) {
      let data;
      return (this.data = this.$moment(movimentacao.dt_movimentacao)
        .format("DD/MM/YYYY"));
    },
    addMovimentacao() {
      if (
        this.movimentacao.fk_id_produto === "" ||
        this.movimentacao.dt_movimentacao === "" ||
        this.movimentacao.tipo_movimentacao === "" ||
        this.movimentacao.fk_id_titular === "" ||
        this.movimentacao.quantidade === ""
      ) {
        alert("Algum campo está nulo ou com valor inválido!!");
      } else {
        Movimentacao.criar(this.movimentacao)
          .then(res => {
            this.movimentacao = {};
            alert("Movimentação salva com sucesso!!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao cadastrar movimentaçao!! " + err);
          });
      }
    },
  },
  created() {
    this.listar();
    this.listarProduto();
    this.formatar();
  }
};
</script>

<style lang="scss">
#Body {
  padding: 50px 50px 50px 50px;
  background-color: rgb(135, 136, 136);
  margin: auto;
  width: auto;
  border-radius: 30px;
}
#Lista {
  padding: 50px;
  background-color: rgb(177, 177, 177);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
#tabela {
  border: 1px solid black;
  border-spacing: 0px;
  text-align: center;
}
td {
  border: 1px solid black;
  padding: 10px;
  width: 1100px;
}
</style>
