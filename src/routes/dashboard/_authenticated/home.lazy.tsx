import Dashboard from '@/pages/dashboard/home'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/_authenticated/home')({
  component: Dashboard,
})
