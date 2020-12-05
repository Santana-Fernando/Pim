<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="success">
      <b-navbar-brand>
        <h1>Pedidos Feitos</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;" id="pessoa">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <br />
    <br />
    <section id="body">
      <label>Prato:</label>
      <b-form-select v-model="pedido.fk_id_prato">
        <b-form-select-option
          :value="prato.id"
          v-for="prato of Pratos"
          :key="prato.id"
        >{{ prato.no_prato }}</b-form-select-option>
      </b-form-select>
      <label>Numero da Mesa:</label>
      <b-form-input v-model="pedido.no_mesa" :type="types[1]" ></b-form-input>
      <label>Titular:</label>
      <b-form-select v-model="pedido.fk_id_titular"> 
        <b-form-select-option :value="1" >Pessoa Fisica</b-form-select-option>
        <b-form-select-option :value="2" >Pessoa Jurídica</b-form-select-option>
      </b-form-select>
      <label>Observação:</label>
      <b-form-textarea
        v-model="pedido.obs_pedido"
        style="height: 200px;"
        placeholder="Observação do pedido"
      ></b-form-textarea>

      <label>Data do pedido:</label>
      <b-form-input v-model="pedido.dt_criacao" :type="types[2]"></b-form-input>

      <label>Tipo de Pedido:</label>
      <b-form-select v-model="pedido.tipo_pedido"> 
        <b-form-select-option :value="1" >Entrega</b-form-select-option>
        <b-form-select-option :value="2" >Pedido a Mesa</b-form-select-option>
      </b-form-select>
      <label>Pedido entregue:</label>
      <b-form-group>
        <b-form-radio-group v-model="pedido.ic_pedido_ativo" :options="options"/>
      </b-form-group>
      <br />
      <br />
      <b-button @click="addPedido()" variant="outline-light" style="width: 100px;" id="CadastroP">
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>
    <br />
    <br />
    <h1 style="text-align: center;">Comandas</h1>
    <section id="lista" style="background-color: rgb(164, 223, 164);">
      <b-list-group>
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Id</td>
            <td>Prato</td>
            <td>Número da Mesa</td>
            <td>Titular</td>
            <td>Observação</td>
            <td>Tipo do pedido</td>
          </tr>
          <tr style="background-color: white;" v-for="pedido in Pedidos" :key="pedido.id">
            <td>{{ pedido.id }}</td>
            <td>{{ pedido.fk_id_prato }}</td>
            <td>{{ pedido.no_mesa }}</td>
            <td>{{ pedido.fk_id_titular == 1 ? "Pessoa Física" : "Pessoa Jurídica" }}</td>
            <td>{{ pedido.obs_pedido }}</td>
            <td>{{ pedido.tipo_pedido == 1 ? "Entrga" : "Pedido a Mesa" }}</td>
            <td>
              <b-button
                title="Atualizar"
                @click="AtualizaPedido(pedido.id, pedido)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="DeletarPedido(pedido.id)"
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
import { moment } from "vue-moment";
import Pedido from "../services/pedido";
import Prato from "../services/cardapio"
export default {
  name: "app",
  data() {
    return {
      pedido: {
        id: "",
        fk_id_prato: "",
        no_mesa: "",
        fk_id_titular: "",
        tipo_pedido:"",
        obs_pedido:"",
        dt_criacao:"",
        ic_pedido_ativo: false
      },
      prato: {
        id: "",
        no_prato: ""
      },
      Pedidos: [],
      Pratos: [],
      types: ["text", "number", "date"],
      options: [
        { text: "Sim", value:true },
        { text: "Não", value: false }
      ]
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listarPratos() {
      Prato.listar().then(res => {
        this.Pratos = res.data;
      });
    },
    listar() {
      Pedido.listar().then(res => {
        this.Pedidos = res.data;
      });
    },
    addPedido() {
      console.log(this.pedido)
      if (!this.pedido.id) {
        if (
          this.pedido.fk_id_prato === "" ||
          this.pedido.no_mesa === "" ||
          this.pedido.fk_id_titular === "" ||
          this.pedido.tipo_pedido === "" ||
          this.pedido.obs_pedido === "" ||
          this.pedido.dt_criacao === "" ||
          this.pedido.ic_pedido_ativo === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Pedido.criar(this.pedido)
            .then(res => {
              console.log(res)
              this.pedido = {};
              alert("Pedido salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar Pedido!! " + err);
            });
        }
      } else {
        if (
          this.pedido.fk_id_prato === "" ||
          this.pedido.no_mesa === "" ||
          this.pedido.fk_id_titular === "" ||
          this.pedido.tipo_pedido === "" ||
          this.pedido.obs_pedido === "" ||
          this.pedido.dt_criacao === "" ||
          this.pedido.ic_pedido_ativo === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          Pedido.atualizar(this.pedido.id, this.pedido)
            .then(res => {
              this.pedido = {};
              alert("Pedido atualizado com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao atualizar Pedido!! " + err);
            });
        }
      }
    },
    DeletarPedido(id) {
      if (confirm("Deseja excluir o Pedido?")) {
        Pedido.deletar(id)
          .then(res => {
            alert("Pedido apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar pedido!! " + err);
          });
      }
    },
    AtualizaPedido(id, pedido) {
      this.pedido = JSON.parse(JSON.stringify(pedido));
    }
  },
  created() {
    this.listar();
    this.listarPratos();
  }
};
</script>

<style lang="scss">
#body {
  padding: 50px 50px 50px 50px;
  background-color: rgb(146, 235, 165);
  margin: auto;
  width: auto;
  border-radius: 30px;
}
#tabela {
  border: 1px solid black;
  border-spacing: 0px;
  text-align: center;
}
#lista {
  padding: 50px;
  background-color: rgb(191, 241, 208);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
td {
  border: 1px solid black;
  padding: 10px;
  width: auto;
}
</style>
