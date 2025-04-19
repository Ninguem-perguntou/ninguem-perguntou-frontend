import { useAuthStore } from "@/store/Auth";
import axios from "axios";
// Importa a biblioteca Axios para fazer solicitações HTTP.

const baseURL = import.meta.env.VITE_PUBLIC_HOST;
const token = useAuthStore.getState().getToken();
// Obtém a URL base da variável de ambiente PUBLIC_HOST.

export const api = axios.create({
    baseURL: baseURL + "/api",
});
// Cria uma instância do cliente Axios chamada 'api' com a URL base definida.

export const apiAuth = axios.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
});
