import { SummonerCard } from '#/features/search-summoners/components/SummonerCard'
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

  return (
    <div>
      {data?.directSearch?.slice(0, 5).map((summoner) => (
        <SummonerCard summoner={summoner} />
      ))}
    </div>
  )
}
