import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import {
  fetchExistentMatchById,
  fetchExistentMatchesByPuuid,
} from '../services/fetchExistentMatches'
import type { fetchExistentMatchesByPuuidRequest } from '../services/fetchExistentMatches'

export function useExistentMatches({
  numberOfMatches,
  puuid,
  skip,
}: fetchExistentMatchesByPuuidRequest) {
  return useQuery({
    queryKey: ['lol', 'matches', puuid],
    queryFn: () =>
      fetchExistentMatchesByPuuid({ numberOfMatches, puuid, skip }),
    enabled: !!puuid,
  })
}

export function useInfiniteExistentMatches({
  numberOfMatches,
  puuid,
  skip,
}: fetchExistentMatchesByPuuidRequest) {
  return useInfiniteQuery({
    queryKey: ['lol', 'matches', puuid],
    queryFn: () =>
      fetchExistentMatchesByPuuid({ numberOfMatches, puuid, skip }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.length === 0) {
        return undefined
      }
      return lastPageParam + 1
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined
      }
      return firstPageParam - 1
    },
  })
}

export function useExistentMatch(matchId: string) {
  return useQuery({
    queryKey: ['lol', 'matches', matchId],
    queryFn: () => fetchExistentMatchById(matchId),
    enabled: !!matchId,
  })
}
