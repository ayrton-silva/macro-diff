import { z } from 'zod'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { useSummoner } from '@/features/summoner/hooks/useSummoner'
import { MatchCard } from '@/features/matches-list/components/MatchCard'
import { useMatches } from '@/features/matches-list/hooks/useMatches'

const summonerSearchSchema = z.object({
  gameName: z.string().default(''),
  region: z.string().default(''),
  tagLine: z.string().default(''),
})

export const Route = createFileRoute('/summoner')({
  component: RouteComponent,
  validateSearch: summonerSearchSchema,
})

function RouteComponent() {
  const { gameName, tagLine, region } = useSearch({
    from: Route.fullPath,
  })

  const { status, data, error, isFetching } = useSummoner({
    gameName,
    tagLine,
    region,
  })

  const {
    status: statusMatches,
    data: dataMatches,
    error: errorMatches,
    isFetching: isFetchingMatches,
  } = useMatches(data?.id)

  return (
    <div>
      <div>Hello {data?.gameName}</div>
      {dataMatches?.map((match: string) => (
        <MatchCard matchId={match} />
      ))}
    </div>
  )
}
