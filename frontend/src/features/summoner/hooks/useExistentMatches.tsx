import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  fetchExistentMatchById,
  fetchExistentMatchesByPuuid,
} from '../services/fetchExistentMatches'
import type { fetchExistentMatchesByPuuidRequest } from '../services/fetchExistentMatches'

export function useExistentMatches({
  numberOfMatches,
  puuid,
  cursor,
}: fetchExistentMatchesByPuuidRequest) {
  return useQuery({
    queryKey: ['lol', 'matches', puuid],
    queryFn: () =>
      fetchExistentMatchesByPuuid({ numberOfMatches, puuid, cursor }),
    enabled: !!puuid,
  })
}

export function useInfiniteExistentMatches({
  numberOfMatches,
  puuid,
  cursor,
}: fetchExistentMatchesByPuuidRequest) {
  return useInfiniteQuery({
    queryKey: ['lol', 'matches', puuid],
    queryFn: () =>
      fetchExistentMatchesByPuuid({ numberOfMatches, puuid, cursor }),
    initialPageParam: 0,
    enabled: !!puuid,
    getNextPageParam: (lastPage, pages) => lastPage.cursor,
  })
}

export function useExistentMatch(matchId: string) {
  return useQuery({
    queryKey: ['lol', 'matches', matchId],
    queryFn: () => fetchExistentMatchById(matchId),
    enabled: !!matchId,
  })
}
