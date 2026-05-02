import { useQuery } from '@tanstack/react-query'
import { fetchSummoner } from '../services/fetchSummoner'

type SearchSummonerRequest = {
  gameName: string
  region: string
  tagLine: string
}

export function useSummoner({
  gameName,
  region,
  tagLine,
}: SearchSummonerRequest) {
  return useQuery({
    queryKey: ['lol', 'summoner', `${gameName + region + tagLine}`],
    queryFn: () => fetchSummoner({ gameName, region, tagLine }),
  })
}
