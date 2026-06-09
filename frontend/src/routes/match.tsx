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
import { useMatchState } from '#/features/match/hooks/useMatchState'
import { MatchMap } from '#/features/match/components/Map/MatchMap'
import { MatchScoreboard } from '#/features/match/components/Map/MatchScoreboard'
import { Spinner } from '#/components/ui/spinner'
import { Skeleton } from '#/components/ui/skeleton'

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
  const [values, setValues] = useState([0])

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

  const { eventsUntilNow, blue, red } = useMatchState(
    matchId,
    values[0],
    match.data?.participants,
  )

  if (!match.data) {
    return <h1>sem partida</h1>
  }

  const sortedFrames = matchTimeline.data?.matchTimeline.participantFrames.sort(
    (a, b) => a.timestamp - b.timestamp,
  )

  return (
    <div className="px-[12%]">
      <MatchHeader match={match.data} />
      <div className="flex items-start gap-5">
        <div className="w-full flex flex-col gap-5">
          <div className="p-5 rounded-md bg-gray-900">
            {matchTimeline.isFetching &&
              <div className="flex flex-col gap-4 h-[1198px] items-center mt-80 rounded-md overflow-hidden bg-gray-900">
                <Spinner className="size-10" />
                Loading Match Data...
              </div>
            }
            <div className="flex justify-center self-center relative">
              {blue.participants && red.participants && (
                <>
                  <MatchScoreboard blue={blue} red={red} />
                  <MatchMap
                    participants={[
                      ...Object.values(blue.participants),
                      ...Object.values(red.participants),
                    ]}
                    events={eventsUntilNow}
                    currentTimestamp={values}
                  />
                </>
              )}
            </div>
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
          {matchTimeline.data?.matchTimeline && (
            <div className="grid grid-cols-2 gap-5 w-full">
              <MatchTeamSummaryCard
                events={matchTimeline.data.matchTimeline.events}
                participantFrames={
                  matchTimeline.data.matchTimeline.participantFrames
                }
                timelineValues={values}
                team="Blue"
                participants={match.data.participants.filter(
                  (p) => p.teamId === '100',
                )}
              />
              <MatchTeamSummaryCard
                events={matchTimeline.data.matchTimeline.events}
                participantFrames={
                  matchTimeline.data.matchTimeline.participantFrames
                }
                timelineValues={values}
                team="Red"
                participants={match.data.participants.filter(
                  (p) => p.teamId === '200',
                )}
              />
            </div>
          )}
        </div>
        <div className="w-80 shrink-0 sticky top-[73px]">
          {matchTimeline.isFetching &&
            <div>
              <div className="mb-4 bg-gray-900 rounded-md px-4 py-2 pb-6">
                <Skeleton className='w-42 h-4 mt-4 ml-2' />
                <Skeleton className='w-full h-12 mt-8' />
                <Skeleton className='w-full h-12 mt-4' />
                <Skeleton className='w-full h-12 mt-4' />
                <Skeleton className='w-full h-12 mt-4' />
              </div>
              <div className="bg-gray-900 h-[524px] px-4 py-2 rounded-md pb-6">
                <Skeleton className='w-42 h-4 mt-4 ml-2' />
                <div className='flex mt-16 items-center'>
                  <Skeleton className='w-14 h-12 mr-4' />
                  <Skeleton className='w-full h-4' />
                </div>
                <div className='flex mt-8 items-center'>
                  <Skeleton className='w-14 h-12 mr-4' />
                  <Skeleton className='w-full h-4' />
                </div>
                <div className='flex mt-8 items-center'>
                  <Skeleton className='w-14 h-12 mr-4' />
                  <Skeleton className='w-full h-4' />
                </div>
              </div>
            </div>
          }
          {matchTimeline.data?.matchTimeline &&
            match.data?.participants &&
            eventsUntilNow.length > 0 && (
              <div>
                <MatchTimelineFilters filter={filter} setFilter={setFilter} />
                <MatchEventFeed
                  events={eventsUntilNow}
                  participants={match.data.participants}
                  filter={filter}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  )
}
