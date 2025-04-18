import { useMutation } from '@tanstack/react-query';
import { api } from '@/service/api';

export const useRegister= () => {
    const mutation = useMutation({
        mutationFn: async ({ email, password, username }: { email: string, password: string, username: string }) => {
            try {
                const result = await api.post('/auth/local/register', { email, password, username });

                if (result.status === 200) {
                    return { success: true, data: result.data, error: null };
                }
                
                throw new Error(result.data?.error || "Falha para registrar usúario");
            } catch (error: any) {
                throw new Error(error.response?.data?.error || "Erro ao tentar registrar usúario");
            }
        },
    });

    return {
        register: mutation.mutateAsync, // Chama a função de forma assíncrona
        loading: mutation.isPending,
        error: mutation.error instanceof Error ? mutation.error.message : null, // Obtém a mensagem de erro correta
    };
};
