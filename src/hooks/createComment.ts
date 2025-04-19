import { apiAuth } from "@/service/api";
import { useMutation } from "@tanstack/react-query";

export const useCreateComments = () => {
  const mutation = useMutation({
    mutationFn: async ({ comment, documentId, idUser }: { comment: string, documentId: string | undefined, idUser: string }) => {
      const result = await apiAuth.post("/api/comments", {data: { comment, news: documentId, users_permissions_user: {connect: [{
        id: idUser, // ID do usuário autenticado
      }]}}});

      if (result.status === 200 || result.status === 201) {
        return { success: true, data: result.data, error: null };
      }

      // Caso o status não seja 200, lança erro
      throw new Error(result.data?.error || "Falha ao criar o comentário");
    },
  });

  return {
    createComment: mutation.mutateAsync, // Mutação como função
    loading: mutation.isPending,
    errorComment: mutation.isError ? mutation.error instanceof Error ? mutation.error.message : "Erro desconhecido" : null, // Melhor tratamento de erro
  };
};
