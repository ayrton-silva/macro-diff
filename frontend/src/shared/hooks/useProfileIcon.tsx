import { useQuery } from '@tanstack/react-query'
import { fetchProfileIcons } from '../services/fetchRiotAssets'

export function useProfileIcons() {
  return useQuery({
    queryKey: ['lol', 'profileIcons'],
    queryFn: fetchProfileIcons,
    staleTime: Infinity,
  })
}
