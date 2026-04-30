import { useQuery } from '@tanstack/react-query'
import { fetchChampions } from '../services/fetchRiotAssets'

export function useChampions() {
  return useQuery({
    queryKey: ['lol', 'champions'],
    queryFn: fetchChampions,
    staleTime: Infinity
  })
}