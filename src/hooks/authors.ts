import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export const useAuhtors = () => {
  const query = useQuery({
    queryKey: ["getAuthors"],
    queryFn: async () => {
      try {
        const result = await api.get("/authors?populate=*");

        if (result.status === 200) {
          return { success: true, data: result.data, error: null };
        }

        throw new Error(result.data?.error || "Falha ao pegar dados dos autores");
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Erro ao pegar dados dos autores");
      }
    },
    enabled: true,
    staleTime: 1000 * 60 * 15, // 5 minutos
  });

  return {
    authorsData: query.data, // Chama a função de forma assíncrona
    loading: query.isPending,
    error: query.error instanceof Error ? query.error.message : null, // Obtém a mensagem de erro correta
  };
};
