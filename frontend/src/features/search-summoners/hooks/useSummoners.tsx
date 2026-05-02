import { useQuery } from '@tanstack/react-query'
import { fetchSummoners } from '../services/fetchSummoners'

type SearchSummonersRequest = {
  gameName: string
  region: string
  tagLine: string
}

export function useSummoners({
  gameName,
  region,
  tagLine,
}: SearchSummonersRequest) {
  return useQuery({
    queryKey: ['lol', 'summoners'],
    queryFn: () => fetchSummoners({ gameName, region, tagLine }),
  })
}
