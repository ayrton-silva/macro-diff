import { useQuery } from '@tanstack/react-query'
import { fetchMatchTimelineById } from '../services/fetchMatchTimeline'

export function useMatchTimeline(matchId: string) {
  return useQuery({
    queryKey: ['lol', 'matches', matchId, 'timeline'],
    queryFn: () => fetchMatchTimelineById(matchId),
    enabled: !!matchId,
  })
}
