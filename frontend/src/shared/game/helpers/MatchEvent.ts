import type { MatchEvent, Participant, TeamId } from '../MatchEvent/types'

type GetMatchEventTeamParams = {
  participants: Participant[]
  matchEvent: MatchEvent
}

export function getMatchEventTeam({
  participants,
  matchEvent,
}: GetMatchEventTeamParams): TeamId {
  if (['WARD_PLACED'].includes(matchEvent.type)) {
    if(matchEvent.creatorId){
      return participants.filter((p) => p.summonerId === matchEvent.creatorId)[0].teamId
    }
    return 100
  }

  if (['BUILDING_KILL', 'TURRET_PLATE_DESTROYED'].includes(matchEvent.type)) {
    const participant = participants.filter(
      (p) => p.summonerId === matchEvent.creatorId,
    )

    return participant.length > 0 ? participant[0].teamId : matchEvent.teamId!
  }

  if (
    [
      'WARD_KILL',
      'CHAMPION_KILL',
      'CHAMPION_SPECIAL_KILL',
      'ELITE_MONSTER_KILL',
    ].includes(matchEvent.type)
  ) {
    return (
      participants.filter((p) => p.summonerId === matchEvent.killerId)[0]
        ?.teamId || matchEvent.teamId
    )
  }

  return 100
}

export function getMatchEventColors(teamId: TeamId) {
  return {
    text: +teamId === 100 ? 'text-cyan-400' : 'text-red-400',
    ring: +teamId === 100 ? 'ring-cyan-400' : 'ring-red-400',
    background: +teamId === 100 ? 'bg-cyan-950' : 'bg-red-950',
  }
}

export function getParticipant(participants: Participant[], id: string) {
  return participants.find((p) => p.summonerId === id)
}
