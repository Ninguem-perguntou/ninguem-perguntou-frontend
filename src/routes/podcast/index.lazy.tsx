import { PodcastList } from '@/pages/(main)/podcast'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/podcast/')({
  component: PodcastList,
})
