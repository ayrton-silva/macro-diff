import { useQuery } from '@tanstack/react-query'
import { fetchMatchById, fetchMatchesByPuuid } from '../services/fetchMatches'

export function useMatches(puuid: string) {
  return useQuery({
    queryKey: ['lol', 'matches', puuid],
    queryFn: () => fetchMatchesByPuuid(puuid),
    enabled: !!puuid,
  })
}

export function useMatch(matchId: string) {
  return useQuery({
    queryKey: ['lol', 'matches', matchId],
    queryFn: () => fetchMatchById(matchId),
    enabled: !!matchId,
  })
}