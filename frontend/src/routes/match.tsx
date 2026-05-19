import { z } from 'zod'
import { createFileRoute, useSearch } from '@tanstack/react-router'
import { MatchHeader } from '#/features/match/components/MatchHeader'
import { useMatch } from '#/features/match/hooks/useMatch'
import { useCreateMatchParticipants } from '#/features/match/hooks/useCreateMatchParticipants'
import { useEffect, useState } from 'react'
import { MatchTeamSummaryCard } from '#/features/match/components/MatchTeamSummaryCard'
import { MatchEventFeed } from '#/features/match/components/Sidebar/MatchEventFeed'
import { useMatchTimeline } from '#/features/match/hooks/useMatchTimeline'
import { MatchTimelineFilters } from '#/features/match/components/Sidebar/MatchTimelineFilters'
import { MatchTimeline } from '#/features/match/components/Map/MatchTimeline'

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
  const matchTimeline = useMatchTimeline(matchId)

  const defaultFilter = {
    championKills: false,
    objectives: false,
    buildings: false,
    wards: false,
  }

  const [filter, setFilter] = useState(defaultFilter)
  const [values, setValues] = useState([0, 0])

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

  useEffect(() => {
    if (matchTimeline.data && matchTimeline.data?.matchTimeline) {
      const sortedFrames =
        matchTimeline.data?.matchTimeline.participantFrames.sort(
          (a, b) => a.timestamp - b.timestamp,
        )

      setValues([
        sortedFrames?.length > 0 ? sortedFrames[0].timestamp : 0,
        sortedFrames?.length > 0
          ? Math.ceil(sortedFrames[sortedFrames.length - 1].timestamp / 60000) *
            60000
          : 0,
      ])
    }
  }, [matchTimeline.data?.matchTimeline])

  if (!match.data) {
    return <h1>sem partida</h1>
  }

  console.log('values', values)

  const sortedFrames = matchTimeline.data?.matchTimeline.participantFrames.sort(
    (a, b) => a.timestamp - b.timestamp,
  )

  return (
    <div className="px-[320px]">
      <MatchHeader match={match.data} />
      <div className="flex items-start gap-5">
        <div className="w-full flex flex-col gap-5">
          <div className="p-5 rounded-md bg-gray-900">
            <img
              className="w-240 h-240 rounded-md mx-auto"
              src="/public/assets/map.png"
              alt="Summoner's Rift Map"
            />
            {matchTimeline.data?.matchTimeline && (
              <MatchTimeline
                min={sortedFrames[0].timestamp}
                max={
                  Math.ceil(
                    sortedFrames[sortedFrames.length - 1].timestamp / 60000,
                  ) * 60000
                }
                values={values}
                setValues={setValues}
              />
            )}
          </div>
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
        <div className="w-80 shrink-0">
          {matchTimeline.data?.matchTimeline && (
            <div>
              <MatchTimelineFilters filter={filter} setFilter={setFilter} />
              <MatchEventFeed
                events={matchTimeline.data.matchTimeline.events}
                participants={match.data.participants}
                filter={filter}
                timelineValues={values}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
