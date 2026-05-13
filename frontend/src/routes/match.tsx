import { z } from 'zod'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { MatchHeader } from '#/features/match/components/MatchHeader'
import { useMatch } from '#/features/match/hooks/useMatch'
import { useCreateMatchParticipants } from '#/features/match/hooks/useCreateMatchParticipants'
import { useEffect } from 'react'
import { MatchTeamSummaryCard } from '#/features/match/components/MatchTeamSummaryCard'

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

  const match = useMatch(matchId)
  const createParticipants = useCreateMatchParticipants(matchId)

  useEffect(() => {
    if (
      match.data &&
      match.data.participants.length > 0 &&
      match.data.participants.length < 10 &&
      !createParticipants.isPending
    ) {
      createParticipants.mutate()
    }
  }, [match.data])

  if (!match.data) {
    return <h1>sem partida</h1>
  }

  return (
    <div className="px-[320px]">
      <MatchHeader match={match.data} />
      <div className="flex items-start gap-5">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full bg-cyan-800 h-80">Mapaaaa</div>
          <div className="grid grid-cols-2 gap-5 w-full">
            <MatchTeamSummaryCard
              team="Blue"
              participants={match.data.participants.filter(
                (p) => p.teamId === '100',
              )}
            />
            <MatchTeamSummaryCard
              team="Red"
              participants={match.data.participants.filter(
                (p) => p.teamId === '200',
              )}
            />
          </div>
        </div>
        <div className="w-80 shrink-0 bg-red-950 h-dvh">Sidebarrrrr</div>
      </div>
    </div>
  )
}
