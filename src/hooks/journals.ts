import { api } from "@/service/api";
import { useQuery } from "@tanstack/react-query";

export const useJornals = () => {
  const query = useQuery({
    queryKey: ["getJornals"],
    queryFn: async () => {
      try {
        const result = await api.get("/articles?populate=*");

        if (result.status === 200) {
          return { success: true, data: result.data, error: null };
        }

        throw new Error(result.data?.error || "Falha no login");
      } catch (error: any) {
        throw new Error(error.response?.data?.error || "Erro ao tentar logar");
      }
    },
    enabled: true,
    staleTime: 1000 * 60 * 15, // 5 minutos
  });

  return {
    jornalData: query.data, // Chama a função de forma assíncrona
    loading: query.isPending,
    error: query.error instanceof Error ? query.error.message : null, // Obtém a mensagem de erro correta
  };
};
