import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';
import { NewsById } from '@/pages/(main)/news/$id';

// Esquema de validação para o parâmetro 'id'
const paramsSchema = z.object({
  id: z.string().min(8), // ou .min(1), ou .regex(...) dependendo do formato esperado
});

export const Route = createFileRoute('/news/$id')({
  component: NewsById,
  beforeLoad: ({ params }) => {
    try {
      paramsSchema.parse(params);
    } catch (error) {
      // Redireciona para a página inicial se a validação falhar
      throw redirect({
        to: '/',
      });
    }
  },
});
