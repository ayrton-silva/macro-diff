import { SummonerCard } from '#/features/search-summoners/components/SummonerCard'
import { useSummoners } from '#/features/search-summoners/hooks/useSummoners'
import { createFileRoute, useSearch } from '@tanstack/react-router'

export const Route = createFileRoute('/search-summoners')({
  component: RouteComponent,
})

function RouteComponent() {
  const { gameName, tagLine, region } = useSearch({
    from: Route.fullPath,
  })

  console.log('reggion', region)
  console.log('tag line', tagLine)
  console.log('nameee ', gameName)

  const { status, data, error, isFetching } = useSummoners({
    gameName,
    tagLine,
    region,
  })

  return (
    <div>
      {data?.directSearch?.map((summoner) => (
        <SummonerCard summoner={summoner} />
      ))}
    </div>
  )
}
