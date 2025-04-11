import { News } from '@/pages/dashboard/news'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/dashboard/_authenticated/news')({
  component: News,
})
