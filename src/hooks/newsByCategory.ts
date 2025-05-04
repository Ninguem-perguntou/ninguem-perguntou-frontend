import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export const useNewsByCategory = (id?: string) => {
  const query = useQuery({
    queryKey: ["getNewsByCategory", id],
    queryFn: async () => {
      try {
        // Consulta da notícia
        const newsResult = await api.get(`/articles?filters[categories][id][$eq]=${id}&populate=*`);

        if (newsResult.status === 200) {
          return { success: true, data: { news: newsResult.data }, error: null };
        }

        throw new Error(newsResult.data?.error || "Falha na consulta");
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Erro ao buscar dados");
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutos
  });

  return {
    newsByCategoryData: query.data?.data?.news, // A notícia
    loading: query.isPending,
    refetch: query.refetch, // Função para refazer a consulta
    error: query.error instanceof Error ? query.error.message : null, // Obtém a mensagem de erro
  };
};
