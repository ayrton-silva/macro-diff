import { useQuery } from '@tanstack/react-query'
import { fetchMatchById } from '../services/fetchMatch'

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: ['lol', 'matches', matchId],
    queryFn: () => fetchMatchById(matchId),
    enabled: !!matchId,
  })
}
