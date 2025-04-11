import { useMutation } from '@tanstack/react-query';
import { api } from '@/service/api';

export const useLogin = () => {
    const mutation = useMutation({
        mutationFn: async ({ email, password }: { email: string, password: string }) => {
            try {
                const result = await api.post('/auth/login', { email, password });

                if (result.status === 200) {
                    return { success: true, data: result.data, error: null };
                }
                
                throw new Error(result.data?.error || "Falha no login");
            } catch (error: any) {
                throw new Error(error.response?.data?.error || "Erro ao tentar logar");
            }
        },
    });

    return {
        login: mutation.mutateAsync, // Chama a função de forma assíncrona
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null, // Obtém a mensagem de erro correta
    };
};
