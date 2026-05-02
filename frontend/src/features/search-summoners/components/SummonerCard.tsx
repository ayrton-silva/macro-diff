import { ProfileIcon } from '#/shared/game/ProfileIcon'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Link } from '@tanstack/react-router'

interface SummonerCardProps {
  summoner: {
    gameName: string
    profileIconId: number
    region: string
    tagLine: string
  }
}

export function SummonerCard({ summoner }: SummonerCardProps) {
  return (
    <Link
      to={`/summoner`}
      search={{
        gameName: summoner.gameName,
        region: summoner.region,
        tagLine: summoner.tagLine,
      }}
    >
      <Card className="bg-cyan-950">
        <CardHeader></CardHeader>
        <CardContent>
          <h1>{summoner.gameName}</h1>
          <ProfileIcon icon={summoner.profileIconId} />
        </CardContent>
      </Card>
    </Link>
  )
}
