import { useQuery } from '@tanstack/react-query'
import { fetchSummonerSpells } from '../services/fetchRiotAssets'

export function useSummonerSpells() {
  return useQuery({
    queryKey: ['lol', 'summoner-spells'],
    queryFn: fetchSummonerSpells,
    staleTime: Infinity
  })
}