import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export const usePodcastById = (id?: string) => {
  const query = useQuery({
    queryKey: ["getPodcast", id],
    queryFn: async () => {
      try {
        // Consulta da notícia
        const newsResult = await api.get("/podcasts/" + id + "?populate=*");

        // Consulta dos comentários
        const commentsResult = await api.get(
          `/comments?filters[podcasts][documentId][$eq]=${id}&populate[users_permissions_user]=true`
        );

        if (newsResult.status === 200 && commentsResult.status === 200) {
          return { success: true, data: { news: newsResult.data, comments: commentsResult.data }, error: null };
        }

        throw new Error(newsResult.data?.error || commentsResult.data?.error || "Falha na consulta");
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Erro ao buscar dados");
      }
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 15, // 15 minutos
  });

  return {
    podcastData: query.data?.data?.news, // A notícia
    commentsData: query.data?.data?.comments, // Os comentários
    loading: query.isPending,
    refetch: query.refetch, // Função para refazer a consulta
    error: query.error instanceof Error ? query.error.message : null, // Obtém a mensagem de erro
  };
};
