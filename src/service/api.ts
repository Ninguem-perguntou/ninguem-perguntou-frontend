import axios from "axios";
// Importa a biblioteca Axios para fazer solicitações HTTP.

const baseURL = import.meta.env.VITE_PUBLIC_HOST;
// Obtém a URL base da variável de ambiente PUBLIC_HOST.

export const api = axios.create({
    baseURL: baseURL + "/api",
});
// Cria uma instância do cliente Axios chamada 'api' com a URL base definida.
