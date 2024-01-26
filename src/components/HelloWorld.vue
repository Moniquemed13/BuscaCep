<template>
  <!-- Componente principal -->
  <div class="cep-app">
    <!-- Título da aplicação -->
    <h1 class="titulo text-center fw-bolder text-white bg-primary p-1 rounded">Buscar CEP 🕵️‍♂️</h1>
    
    <!-- Campo de entrada do CEP -->
    <div class="cep-input input-group mb-3">
      <label class="p-2 text-dark" style="font-weight: bold;" for="cep">CEP:</label>
      <!-- Input para inserção do CEP, com vinculação bidirecional usando v-model -->
      <input placeholder="Digite um CEP" type="text" v-model="cep" id="cep" maxlength="9" @input="formatarCep" />
      
      <!-- Botão para iniciar a busca do CEP -->
      <button @click="acaoBuscaCep">Buscar</button>
    </div>

    <!-- Exibição do resultado do CEP -->
    <div v-if="endereco" class="resultado shadow-lg p-3 mb-3 bg-body-tertiary rounded">
      <h2 class="p-1 mb-3">Resultado:</h2>   
      <!-- Exibição das informações do endereço -->   
      <p class="text-primary"><strong class="text-dark font-italic">CEP:</strong> <em> {{ endereco.cep }} </em></p>
      <p class="text-primary"><strong class="text-dark font-italic">Logradouro:</strong> <em>{{ endereco.logradouro }} </em></p>
      <p class="text-primary"><strong class="text-dark">Bairro:</strong> <em> {{ endereco.bairro }} </em></p>
      <p class="text-primary"><strong class="text-dark">Cidade:</strong> <em> {{ endereco.localidade }} </em></p>
      <p class="text-primary"><strong class="text-dark">Estado:</strong> <em> {{ endereco.uf }} </em></p>
    </div>
    
    <!-- Mensagem exibida quando o CEP é inválido -->
    <div v-else-if="cepInvalido" class="erro">
      <p><strong>CEP Inválido:</strong> O CEP inserido não foi encontrado.</p>
    </div>

    <!-- Mensagem exibida quando nenhum CEP foi inserido -->
    <div v-else-if="cepVazio" class="erro">
      <p><strong>Insira um CEP</strong></p>
    </div>
  </div>
</template>

<script>
// Importação do serviço de busca de CEP
import buscaCep from '@/services';

export default {
  // Dados do componente
  data() {
    return {
      cep: "",        // CEP inserido pelo usuário
      endereco: null, // Informações do endereço
      cepInvalido: false, // Indica se o CEP é inválido
      cepVazio: false,    // Indica se nenhum CEP foi inserido
    };
  },
  // Métodos do componente
  methods: {
    // Método para buscar o CEP
    async acaoBuscaCep() {
      // Verifica se o CEP está vazio
      if (this.cep.trim() === "") {
        this.cepVazio = true;
        this.cepInvalido = false;
        this.endereco = null;
      } else {
        this.cepVazio = false;

        // Limpa o CEP de caracteres não numéricos
        const cepLimpo = this.cep.replace(/\D/g, '');
        this.cepInvalido = !/^\d{8}$/.test(cepLimpo);

        if (!this.cepInvalido) {
          // Busca o CEP e verifica se há erro na resposta
          const resposta = await buscaCep(cepLimpo);
          
          if (resposta && resposta.erro) {
            this.cepInvalido = true;
            this.endereco = null;
          } else {
            this.cepInvalido = false;
            this.mostrarDados();
          }
        } else {
          this.endereco = null;
        }
      }
    },
    
    // Método para exibir os dados do CEP armazenados localmente
    mostrarDados() {
      this.endereco = JSON.parse(localStorage.getItem('endereco'));
    },
    
    // Método para formatar a entrada do CEP (adiciona o formato 06395-370)
    formatarCep() {
      this.cep = this.cep.replace(/\D/g, '');

      if (this.cep.length > 5) {
        this.cep = this.cep.slice(0, 5) + "-" + this.cep.slice(5);
      }

      if (this.cep.length > 9) {
        this.cep = this.cep.slice(0, 9);
      }
    },
    
    // Método para limpar o resultado do CEP
    limparResultado() {
      this.endereco = null;
    },
  },
  // Método executado antes do componente ser montado
  beforeMount() {
    // Limpa as informações do CEP ao recarregar a página
    this.limparResultado();
  },
};
</script>

<style>
  /* Estilos para o corpo da página */
  body {
    font-family: 'Arial', sans-serif;
  }
  
  /* Estilos para o componente principal */
  .cep-app {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(31, 30, 30, 0.1);
  }

  /* Estilos para o título */
  .titulo {
    text-align: center;
    margin-bottom: 20px;
  }

  /* Estilos para o campo de entrada do CEP */
  .cep-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  /* Estilos para o input do CEP */
  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 3px;
    font-family: 'Verdana', sans-serif;
  }

  /* Estilos para o botão de busca */
  button {
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Arial', sans-serif;
  transition: background-color 0.3s, color 0.3s, transform 0.3s;
}

button:hover {
  background-color: blue;
  transform: scale(1.05);
}


  /* Estilos para a área de resultado ou mensagem de erro */
  .resultado {
    margin-top: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: 'Arial', sans-serif;
  }

  /* Estilos específicos para a mensagem de erro */
  .erro {
    color: #e20800;
    font-family: 'Arial', sans-serif;
    text-align: center;
  }
</style>