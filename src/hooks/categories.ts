import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export const useCategories = () => {
  const query = useQuery({
    queryKey: ["getCategories"],
    queryFn: async () => {
      try {
        const result = await api.get("/categories");

        if (result.status === 200) {
          return { success: true, data: result.data, error: null };
        }

        throw new Error(result.data?.error || "Falha ao carregar categorias");
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Erro ao carregar categorias");
      }
    },
    enabled: true,
    staleTime: 1000 * 60 * 30, // 30 minutos
  });

  return {
    categoriesData: query.data, // Chama a função de forma assíncrona
    loading: query.isPending,
    error: query.error instanceof Error ? query.error.message : null, // Obtém a mensagem de erro correta
  };
};
