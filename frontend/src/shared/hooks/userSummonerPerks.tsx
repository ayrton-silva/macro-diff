import { useQuery } from '@tanstack/react-query'
import { fetchSummonerPerks } from '../services/fetchRiotAssets'

export function useSummonerPerks() {
  return useQuery({
    queryKey: ['lol', 'summoner-perks'],
    queryFn: fetchSummonerPerks,
    staleTime: Infinity
  })
}