import { Login } from '@/pages/auth/login'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(auth)/auth/login')({
  component: Login,
})
