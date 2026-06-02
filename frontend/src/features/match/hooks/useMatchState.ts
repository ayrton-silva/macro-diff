import { useMemo } from 'react'
import { useMatchTimeline } from './useMatchTimeline'
import type { MatchEvent, Participant } from '@/shared/game/MatchEvent/types'
import { aggregateTeamsStatus } from '../utils/aggregateTeamsStatus'

export function useMatchState(
  matchId: string,
  currentTimestamp: number,
  participants,
) {
  const { data } = useMatchTimeline(matchId)

  return useMemo(() => {
    if (!data) return null

    const { events, participantFrames } = data.matchTimeline

    const eventsUntilNow = events.filter(
      (e: MatchEvent) => e.timestamp <= currentTimestamp,
    )

    const currentFrames = participantFrames
      .filter((f) => f.timestamp <= currentTimestamp)
      .reduce((acc, frame) => {
        acc[frame.participantPuuid] = frame

        return acc
      }, {})

    const { blue, red } = aggregateTeamsStatus(
      events,
      currentFrames,
      participants,
    )

    return { eventsUntilNow, currentFrames, blue, red }
  }, [data, currentTimestamp])
}
