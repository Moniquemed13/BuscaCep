import axios from "axios";


const buscaCep = async (cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        localStorage.setItem('endereco', JSON.stringify(response.data));
        return response.data;
      } catch (error) {
        console.error("Erro ao buscar CEP:", error);
        
  } }

export default buscaCep