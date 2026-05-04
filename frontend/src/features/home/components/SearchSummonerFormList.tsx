import { SummonerSearchlistCard } from '@/features/search-summoners/components/SummonerSearchListCard'
import { useSummoners } from '@/features/search-summoners/hooks/useSummoners'

type SearchSummonerFormListProps = {
  gameName: string
}

export function SearchSummonerFormList({
  gameName,
}: SearchSummonerFormListProps) {
  const { status, data, error, isFetching } = useSummoners({
    gameName,
    region: '',
    tagLine: '',
  })

  if(data?.directSearch.length > 0){
    return (<div className="border border-gray-700 mt-4 rounded-md overflow-hidden">
      {data?.directSearch?.slice(0, 5).map((summoner) => (
        <SummonerSearchlistCard summoner={summoner} />
      ))}
    </div>)
  }
  
  return (
    null
  )
}
