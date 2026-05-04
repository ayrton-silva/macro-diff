import { ParticipantCard } from '@/features/matches-list/components/ParticipantCard'
import { useMatch } from '@/features/matches-list/hooks/useMatches'
import { Card, CardContent } from '@/components/ui/card'

interface MatchCardProps {
  matchId: string
  summonerId: string
}

export function SummonerMatchCard({ matchId, summonerId }: MatchCardProps) {
  const { status, data, error, isFetching } = useMatch(matchId)

  if (!data) {
    return null
  }

  const summonerWin = data?.participants.filter(
    (p) => p.summonerId === summonerId,
  )[0].win

  return (
    <div className="max-w-7xl mx-auto grid gap-6">
      <Card className={summonerWin ? 'bg-[#172335]' : 'bg-[#221923]'}>
        <CardContent>
          <div className="flex gap-4">
            <div className="w-full flex flex-col gap-4">
              {data?.participants
                .filter((p) => p.summonerId === summonerId)
                ?.map((participant) => (
                  <ParticipantCard participant={participant} />
                ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
