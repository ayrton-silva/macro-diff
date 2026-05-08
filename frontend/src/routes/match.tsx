import { z } from 'zod'
import { createFileRoute, useSearch } from '@tanstack/react-router'

const matchSchema = z.object({
  matchId: z.string().default(''),
})

export const Route = createFileRoute('/match')({
  component: RouteComponent,
  validateSearch: matchSchema,
})

function RouteComponent() {
  const { matchId } = useSearch({
    from: Route.fullPath,
  })

  return <div>{matchId}</div>
}
