<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="warning">
      <b-navbar-brand>
        <h1>Novo produto</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;" id="pessoa">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <br />
    <br />
    <section id="Body">
      <label>Nome do produto:</label>
      <b-form-input v-model="insumo.no_insumo" placeholder="Digite o nome do prato..."></b-form-input>

      <label>Detalhes do produto:</label>
      <b-form-textarea
        v-model="insumo.detalhes"
        style="height: 200px;"
        placeholder="Digite o seu nome completo"
      ></b-form-textarea>

      <label>Data da Movimentação:</label>
      <b-form-input v-model="insumo.dt_movimentacao" :type="types[1]"></b-form-input>
      
      <label>Data de Validade:</label>
      <b-form-input v-model="insumo.dt_validade" :type="types[1]"></b-form-input>
      
      <label>Valor unitário:</label>
      <b-form-input v-model="insumo.vr_unitario" :type="types[0]"></b-form-input>

      <label>Titular:</label>
      <b-form-select v-model="insumo.fk_id_titular">
        <b-form-select-option :value="1" >Pessoa Fisica</b-form-select-option>
        <b-form-select-option :value="2" >Pessoa Jurídica</b-form-select-option>
      </b-form-select>

      <label>Quantidade:</label>
      <b-form-input v-model="insumo.quantidade" :type="types[0]"></b-form-input>

      <br />
      <br />
      <b-button @click="addProduto()" variant="outline-light" style="width: 100px;" id="CadastroP">
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>
    <br />
    <br />
    <h1 style="text-align: center;">Lista de Produtos</h1>
    <br />
    <br />
    <section id="listaDeCadastros">
      <b-list-group>
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Nome do produto</td>
            <td>Detalhes do produto</td>
            <td>Data da Movimentação</td>
            <td>Data de Validade</td>
            <td>Valor unitário</td>
            <td>Titular</td>
            <td>Quantidade</td>
          </tr>
          <tr style="background-color: white;" v-for="insumo of Insumos" :key="insumo.id">
            <td>{{ insumo.no_insumo }}</td>
            <td>{{ insumo.detalhes }}</td>
            <td>{{ formatarData(insumo.dt_movimentacao, insumo) }}</td>
            <td>{{ formatarDataValidade(insumo.dt_validade, insumo) }}</td>
            <td>{{ insumo.vr_unitario }}</td>
            <td>{{ insumo.fk_id_titular == 1 ? "Pessoa Física" : "Pessoa Jurídica" }}</td>
            <td>{{ insumo.quantidade }}</td>
            <td>
              <b-button
                title="Atualizar"
                @click="AtualizaProduto(id, insumo)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="DeletarProduto(insumo.id)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="trash" style="width: 25px; height: 30px;"></b-icon>
              </b-button>
            </td>
          </tr>
        </table>
      </b-list-group>
    </section>
  </div>
</template>

<script>
import Insumo from "../services/insumo";
export default {
  name: "app",
  data() {
    return {
      insumo: {
        id: "",
        no_insumo: "",
        detalhes: "",
        dt_movimentacao:"",
        dt_validade:"",
        vr_unitario:"",
        fk_id_titular:"",
        quantidade:""
      },
      types: ["number", "date"],
      Insumos: []
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listar() {
      Insumo.listar().then(res => {
        this.Insumos = res.data;
      });
    },
    formatarData(datas, insumo) {
      let data;
      return (this.data = this.$moment(insumo.dt_movimentacao)
        .format("DD/MM/YYYY"));
    },
    formatarDataValidade(datas, insumo) {
      let data;
      return (this.data = this.$moment(insumo.dt_validade)
        .format("DD/MM/YYYY"));
    },
    addProduto() {
      if (!this.insumo.id) {
        console.log(this.insumo)
        if (
          this.insumo.no_insumo === "" ||
          this.insumo.detalhes === "" ||
          this.insumo.dt_movimentacao === "" ||
          this.insumo.dt_validade === "" ||
          this.insumo.vr_unitario === "" ||
          this.insumo.fk_id_titular === "" ||
          this.insumo.quantidade === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Insumo.criar(this.insumo)
            .then(res => {
              this.insumo = {};
              alert("Produto salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar Produto!! " + err);
            });
        }
      } else {
        if (
          this.insumo.no_insumo === "" ||
          this.insumo.detalhes === "" ||
          this.insumo.dt_movimentacao === "" ||
          this.insumo.dt_validade === "" ||
          this.insumo.vr_unitario === "" ||
          this.insumo.fk_id_titular === "" ||
          this.insumo.quantidade === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Insumo.atualizar(this.insumo.id, this.insumo)
            .then(res => {
              this.insumo = {};
              alert("produto Atualizado com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao Atualizar Produto!! " + err);
            });
        }
      }
    },
    AtualizaProduto(id, insumo) {
      this.insumo = JSON.parse(JSON.stringify(insumo));
    },
    DeletarProduto(id) {
      if (confirm("Deseja excluir o produto?")) {
        Insumo.deletar(id)
          .then(res => {
            alert("produto apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar produto!! " + err);
          });
      }
    }
  },
  created() {
    this.listar();
  }
};
</script>

<style lang="scss">
#Body {
  padding: 50px 50px 50px 50px;
  background-color: rgb(241, 215, 66);
  margin: auto;
  border-radius: 30px;
}

#listaDeCadastros {
  padding: 50px;
  background-color: rgb(247, 239, 139);
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
