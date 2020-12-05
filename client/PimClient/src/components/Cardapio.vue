<template>
  <div id="app">
    <b-navbar toggleable style="padding: 30px;" type="dark" variant="info">
      <b-navbar-brand>
        <h1>Novo Prato</h1>
      </b-navbar-brand>

      <b-button variant="outline-light" @click="returnHome()" style="width: 100px;">
        Voltar
        <b-icon icon="arrow-left" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </b-navbar>
    <!--Corpo da aplicação-->
    <br />
    <br />
    <section id="BodyCardapio">
      <label>Nome do prato:</label>
      <b-form-input v-model="prato.no_prato" placeholder="Digite o nome do prato..."></b-form-input>

      <label>Descrição do prato:</label>
      <b-form-textarea
        v-model="prato.desc_prato"
        style="height: 200px;"
        placeholder="Descreva bem o prato"
      ></b-form-textarea>

      <label>Titular:</label>
      <b-form-select v-model="prato.fk_id_titular">
        <b-form-select-option :value="1">Pessoa Física</b-form-select-option>
        <b-form-select-option :value="2">Pessoa Jurídica</b-form-select-option>
      </b-form-select>

      <br>
      <br>
      <b-button @click="addCardapio()" variant="outline-light" style="width: 100px;" id="CadastroP">
        Salvar
        <b-icon icon="file-earmark-plus" style="width: 60px; height: 30px;"></b-icon>
      </b-button>
    </section>

    <br />
    <br />

    <h1 style="text-align: center;">Pratos</h1>
    <!--Corpo de listagem e alterações-->
    <section id="listaDePratos">
      <b-list-group>
        <!--Lista-->
        <table id="tabela">
          <tr style="background-color: gray; color:white; ">
            <td>Id prato</td>
            <td>Nome do Prato</td>
            <td>Descrição do prato</td>
            <td>Titular</td>
          </tr>
          <tr style="background-color: white;" v-for="prato in cardapio" :key="prato.id">
            <td>{{ prato.id }}</td>
            <td>{{ prato.no_prato }}</td>
            <td>{{ prato.desc_prato }}</td>
            <td>{{ prato.fk_id_titular == 1 ? "Pessoa Física" : "Pessoa Jurídica" }}</td>
            <td>
              <b-button
                title="Atualizar"
                @click="AtualizaPrato(prato.id, prato)"
                variant="info"
                style="width: 50px;"
              >
                <b-icon icon="arrow-clockwise" style="width: 25px; height: 30px;"></b-icon>
              </b-button>

              <b-button
                title="Excluir"
                @click="RemoverPrato(prato.id)"
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
    };
  },
  methods: {
    returnHome() {
      this.$router.push({
        path: "/"
      });
    },
    listar() {
        Cardapio.listar().then(res => {
        this.cardapio = res.data;
      });
    },
    addCardapio() {
      console.log(this.prato)
      if (!this.prato.id) {
        if (
          this.prato.no_prato === "" ||
          this.prato.desc_prato === "" ||
          this.prato.fk_id_titular === ""
        ) {
          alert("Nenhum campo pode ser nulo!!");
        } else {
          Cardapio.criar(this.prato)
            .then(res => {
              this.prato = {};
              alert("Prato salvo com sucesso!!");
              this.listar();
            })
            .catch(err => {
              alert("Erro ao cadastrar prato!! " + err);
            });
        }
      } else {
        if (
          this.prato.no_prato === "" ||
          this.prato.desc_prato === "" ||
          this.prato.fk_id_titular === ""
        ) {
          alert("Algum campo está nulo ou com valor inválido!!");
        } else {
          if (
            this.prato.no_prato === "" ||
            this.prato.desc_prato === "" ||
            this.prato.fk_id_titular === ""
          ) {
            alert("Algum campo está nulo ou com valor inválido!!");
          } else {
            Cardapio.atualizar(this.prato.id, this.prato)
              .then(res => {
                this.prato = {};
                alert("Prato Atualizado com sucesso!!");
                this.listar();
              })
              .catch(err => {
                alert("Erro ao Atualizar contato!! " + err);
              });
          }
        }
      }
    },
    RemoverPrato(id) {
      if (confirm("Deseja excluir o o usuário?")) {
      Cardapio.deletar(id)
          .then(res => {
            alert("Prato apagado com sucesso!");
            this.listar();
          })
          .catch(err => {
            alert("Erro ao Apagar prato!! " + err);
          });
      }
    },
    AtualizaPrato(id, prato) {
      this.prato = JSON.parse(JSON.stringify(prato));
    }
  },
  created() {
    this.listar();
  }
};
</script>

<style lang="scss">
#BodyCardapio {
  padding: 50px;
  background-color: rgb(66, 206, 241);
  margin: auto;
  border-radius: 30px;
  width: auto;
}
#listaDePratos {
  padding: 50px;
  background-color: rgb(191, 231, 241);
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
