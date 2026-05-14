import { useEffect } from "react"
import { useExistentMatch } from "../hooks/useExistentMatches"

export function MatchDataCollector({
  matchId,
  summonerId,
  onData,
}: {
  matchId: string
  summonerId: string
  onData: (matchId: string | null ,position: string | null, winLose: boolean , champion: string | null) => void
}) {
  const { status, data } = useExistentMatch(matchId)

  useEffect(() => {
    if (status === 'success') {
      const participant = data.participants.find(
        (p:any) => p.summonerId === summonerId
      )
      onData(matchId ,participant?.teamPosition ?? null, participant?.win ?? null, participant?.championName ?? null)
    }
  }, [status, data, summonerId, onData])

  return null
}