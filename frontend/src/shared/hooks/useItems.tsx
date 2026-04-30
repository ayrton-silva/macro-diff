import { useQuery } from '@tanstack/react-query'
import { fetchItems } from '../services/fetchRiotAssets'

export function useItems() {
  return useQuery({
    queryKey: ['lol', 'items'],
    queryFn: fetchItems,
    staleTime: Infinity
  })
}