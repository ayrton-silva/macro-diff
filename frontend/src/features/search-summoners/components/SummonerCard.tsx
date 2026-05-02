import { ProfileIcon } from '#/shared/game/ProfileIcon'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

interface SummonerCardProps {
  summoner: {
    gameName: string
    profileIconId: number
  }
}

export function SummonerCard({ summoner }: SummonerCardProps) {
  console.log('summoner', summoner)
  return (
    <Card className="bg-cyan-950">
      <CardHeader></CardHeader>
      <CardContent>
        <h1>{summoner.gameName}</h1>
        <ProfileIcon icon={summoner.profileIconId} />
      </CardContent>
    </Card>
  )
}
