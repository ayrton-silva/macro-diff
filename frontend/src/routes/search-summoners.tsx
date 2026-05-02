import { SummonerCard } from '#/features/search-summoners/components/SummonerCard'
import { useSummoners } from '#/features/search-summoners/hooks/useSummoners'
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/search-summoners')({
  component: RouteComponent,
})

function RouteComponent() {
  const { gameName, tagLine, region } = useSearch({
    from: Route.fullPath,
  })

  const [summoner, setSummoner] = useState({})

  const { status, data, error, isFetching } = useSummoners({
    gameName,
    tagLine,
    region,
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (status === 'success') {
      setSummoner(data)
    }
  }, [data])

  useEffect(() => {
    if (
      summoner.hasOwnProperty('summonerExactlyMatch') &&
      summoner.summonerExactlyMatch.length > 0
    ) {
      navigate({
        to: `/summoner`,
        search: {
          gameName: summoner.summonerExactlyMatch[0].gameName,
          region: summoner.summonerExactlyMatch[0].region,
          tagLine: summoner.summonerExactlyMatch[0].tagLine,
        },
      })
    }
  }, [summoner])

  return (
    <div>
      {summoner?.directSearch?.map((summoner) => (
        <SummonerCard summoner={summoner} />
      ))}
    </div>
  )
}
