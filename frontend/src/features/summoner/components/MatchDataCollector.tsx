import { useEffect } from "react"
import { useExistentMatch } from "../hooks/useExistentMatches"

export function MatchDataCollector({
  matchId,
  summonerId,
  onData,
}: {
  matchId: string
  summonerId: string
  onData: (position: string | null) => void
}) {
  const { status, data } = useExistentMatch(matchId)

  useEffect(() => {
    if (status === 'success') {
      const participant = data.participants.find(
        (p:any) => p.summonerId === summonerId
      )
      onData(participant?.teamPosition ?? null)
    }
  }, [status, data, summonerId, onData])

  return null
}