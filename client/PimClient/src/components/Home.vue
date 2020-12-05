<template>
  <div id="app">
    <div id="barra">
      <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">
          <h1>EyCheff</h1>
        </b-navbar-brand>
        <b-navbar-nav></b-navbar-nav>
      </b-navbar>
    </div>
    <br />
    <section id="corpo">
      <!--Botão de cadastrar pessoas-->
      <b-button
        variant="outline-primary"
        @click="CadastrarPessoa()"
        style="width: 390px;"
        id="pessoa"
      >
        <b-icon icon="egg-fried" style="width: 200px; height: 200px;"></b-icon>
        <h1>Pratos</h1>
      </b-button>
      <!--Botão de cadastrar pessoas-->
      <b-button
        variant="outline-success"
        @click="CadastrarAnimal()"
        style="width: 390px;"
        id="animal"
      >
        <b-icon icon="pencil-square" style="width: 200px; height: 200px;"></b-icon>
        <h1>Pedidos</h1>
      </b-button>
      <!--Botão de cadastrar pessoas-->
      <b-button variant="outline-warning" 
      @click="CadastrarLote()" 
      style="width: 390px;" 
      id="Lote">
        <b-icon icon="list-task" style="width: 200px; height: 200px;"></b-icon>
        <h1>Insumos</h1>
      </b-button>
      <!--Botão de cadastrar pessoas-->
      <b-button
        variant="outline-secondary"
        @click="CadastrarAnimalLote()"
        style="width: 390px;"
        id="Lote"
      >
        <b-icon icon="arrow-left-right" style="width: 200px; height: 200px;"></b-icon>
        <h1>Movimentações</h1>
      </b-button>

      <br />
      <br />

      <h1 style="text-align: center;">Cardápio</h1>
      <b-list-group>
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Nome do Prato</td>
            <td>Descrição do prato</td>
          </tr>
          <tr style="background-color: white; border: 1px solid black;" v-for="prato in cardapio" :key="prato.id">
            <td>{{ prato.no_prato }}</td>
            <td>{{ prato.desc_prato }}</td>
          </tr>
        </table>
      </b-list-group>
    </section>
  </div>
</template>

<script>
import Cardapio from "../services/cardapio";
export default {
  name: "app",
  data() {
    return {
      prato: {
        id: '',
        no_prato: '',
        desc_prato: '',
        fk_id_titular: '',
      },
      cardapio: [],
      msg: "Welcome to Your React.js App"
    };
  },
  methods: {
    listar() {
        Cardapio.listar().then(res => {
        this.cardapio = res.data;
      });
    },
    CadastrarPessoa() {
      this.$router.push({
        path: "/cardapio"
      });
    },
    CadastrarAnimal() {
      this.$router.push({
        path: "/pedido"
      });
    },
    CadastrarLote() {
      this.$router.push({
        path: "/insumo"
      });
    },
    CadastrarAnimalLote() {
      this.$router.push({
        path: "/movimentacao"
      });
    }
  },
  created() {
    this.listar();
  }
};
</script>

<style lang="scss">
#corpo {
  margin: 150px;
  width: auto;
}
#tabela {
  border: 1px solid black;
  border-spacing: 0px;
  text-align: center;
}
</style>

