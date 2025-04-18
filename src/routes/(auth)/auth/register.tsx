import { Register } from '@/pages/auth/sign-out'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/auth/register')({
  component: Register,
})
