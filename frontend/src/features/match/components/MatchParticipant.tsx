import { Card, CardContent } from '@/components/ui/card'
import { ChampionIcon } from '@/shared/game/ChampionIcon'
import { SummonerSpellIcon } from '#/shared/game/SummonerSpellIcon'
import { ItemIcon } from '#/shared/game/ItemIcon'

interface Participant {
  puuid: string
  championName: string
  champLevel: number
  lane: string
  teamPosition: string
  summoner1Id: number
  summoner2Id: number
  totalMinionsKilled: number
  totalDamageDealtToChampions: number
  wardsPlaced: number
  goldEarned: number
  riotIdGameName: string
  riotIdTagline: string
  item0: number
  item1: number
  item2: number
  item3: number
  item4: number
  item5: number
  item6: number
  teamId: string
  win: boolean
  summoner: {
    gameName: string
    tagLine: string
    region: string
  }
  kills: number
  deaths: number
  assists: number
}

interface ParticipantProps {
  participant: Participant
}

export function MatchParticipant({ participant }: ParticipantProps) {
  return (
    <Card className="bg-transparent text-white">
      <CardContent>
        <>
          <div className="flex gap-4">
            <div className="flex gap-1">
              <div className="shadow-2xl shadow-black w-fit">
                <ChampionIcon
                  icon={participant.championName}
                  level={participant.champLevel}
                />
              </div>
              <div>
                <SummonerSpellIcon summonerSpellKey={participant.summoner1Id} />
                <SummonerSpellIcon summonerSpellKey={participant.summoner2Id} />
              </div>
            </div>

            <div className="flex gap-1">
              <ItemIcon itemKey={participant.item0} />
              <ItemIcon itemKey={participant.item1} />
              <ItemIcon itemKey={participant.item2} />
              <ItemIcon itemKey={participant.item3} />
              <ItemIcon itemKey={participant.item4} />
              <ItemIcon itemKey={participant.item5} />
              <ItemIcon itemKey={participant.item6} />
            </div>

            <p className="flex gap-2 text-lg font-bold">
              <span>{participant.kills}</span>
              <span>/</span>
              <span>{participant.deaths}</span>
              <span>/</span>
              <span>{participant.assists}</span>
            </p>
          </div>
        </>
      </CardContent>
    </Card>
  )
}
