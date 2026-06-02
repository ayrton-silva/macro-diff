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
    if (!data)
      return { eventsUntilNow: 0, blue: {}, red: {}, currentFrames: {} }

    const { events, participantFrames } = data.matchTimeline

    const eventsUntilNow = events.filter(
      (e: MatchEvent) => e.timestamp <= currentTimestamp,
    )

    const currentFrames = participantFrames
      .filter((f) => f.timestamp <= currentTimestamp + 5999)
      .reduce((acc, frame) => {
        acc[frame.participantPuuid] = frame

        return acc
      }, {})

    const { 100: blue, 200: red } = aggregateTeamsStatus(
      eventsUntilNow,
      currentFrames,
      participants,
    )

    return { eventsUntilNow, currentFrames, blue, red }
  }, [data, currentTimestamp])
}
