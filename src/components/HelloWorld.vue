<template>
  <div>
    <h1>Buscar CEP</h1>
    <div>
      <label for="cep">CEP:</label>
      <input type="text" v-model="cep" id="cep" />
      <button @click="acaoBuscaCep">Buscar</button>
    </div>
    <div v-if="endereco">
      <h2>Resultado:</h2>
      <p><strong>CEP:</strong> {{ endereco.cep }}</p>
      <p><strong>Logradouro:</strong> {{ endereco.logradouro }}</p>
      <p><strong>Bairro:</strong> {{ endereco.bairro }}</p>
      <p><strong>Cidade:</strong> {{ endereco.localidade }}</p>
      <p><strong>Estado:</strong> {{ endereco.uf }}</p>
    </div>
  </div>
</template>

<script>
import buscaCep from '@/services';
export default {
  data() {
    return {
      cep: "",
      endereco: null,
    };
  },
  methods: {
   async acaoBuscaCep() {
    await buscaCep (this.cep)
    this.mostrarDados()
   },
   mostrarDados (){
    this.endereco = JSON.parse (localStorage.getItem('endereco'))
   }
  },
  mounted (){
    this.mostrarDados()
  }
};
</script>

<style scoped>
</style>
