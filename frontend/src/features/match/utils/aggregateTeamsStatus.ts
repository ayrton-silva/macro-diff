import type { MatchEvent, Participant } from '#/shared/game/MatchEvent/types'
import { calculateDeathTimer } from './calculateDeathTimer'

type BuildingType = 'tower' | 'inhibitor' | 'nexus'

export function aggregateTeamsStatus(
  events: MatchEvent[],
  currentFrames,
  participants: Participant[],
) {
  function createParticipants(start = 0) {
    return Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [
        start + i + 1,
        {
          kills: 0,
          deaths: 0,
          assists: 0,
          positionX: 0,
          positionY: 0,
          champion: '',
          gameName: '',
          teamPosition: '',
          summonerId: '',
          teamId: 100,
          champLevel: 1,
          currentGold: 0,
          minionsKilled: 0,
          lastDeath: 0,
          isDead: false,
          brw: 0,
        },
      ]),
    )
  }

  const teamsStats = events.reduce(
    (acc, event) => {
      const eventId =
        event.killerId || event.creatorId || event.participantPuuid
      const teamId = eventId
        ? participants.find((p) => p.summonerId === eventId).teamId
        : event.teamId === 100
          ? '200'
          : '100'

      if (event.type === 'ELITE_MONSTER_KILL') {
        if (event.monsterType === 'DRAGON') {
          acc[teamId].dragons.push(event.monsterSubType)
        }

        if (event.monsterType === 'HORDE') {
          acc[teamId].hordes++
        }

        if (event.monsterType === 'BARON_NASHOR') {
          acc[teamId].nashors++
        }

        if (event.monsterType === 'RIFTHERALD') {
          acc[teamId].herald++
        }
      }

      if (event.type === 'CHAMPION_KILL') {
        let participantKillerId = null
        let participantVictimId = null
        let participantAssistId = null

        for (const [key, value] of Object.entries(currentFrames)) {
          if (key === event.killerId) {
            participantKillerId = value.participantFrameId
            const participant = (acc[teamId].participants[
              participantKillerId
            ] ??= {
              kills: 0,
            })

            participant.kills++
            acc[teamId].kills++
          }

          if (key === event.victimId) {
            participantVictimId = value.participantFrameId
            const participant =
              acc[teamId === '100' ? '200' : '100'].participants[
                participantVictimId
              ]

            if (participant) {
              participant.deaths++
              participant.lastDeath = event.timestamp
            }
          }

          if (event.assistingParticipantIds.length > 0) {
            event.assistingParticipantIds.forEach((assistId) => {
              if (assistId === value.participantPuuid) {
                participantAssistId = value.participantFrameId
              } else {
                participantAssistId = null
              }

              if (participantAssistId) {
                const participant = (acc[teamId].participants[
                  participantAssistId
                ] ??= {
                  assists: 0,
                })

                participant.assists++
              }
            })
          }
        }
      }

      if (event.type === 'BUILDING_KILL') {
        const teamId = event.teamId === 100 ? '200' : '100'
        if (event.buildingType === 'TOWER_BUILDING') {
          acc[teamId].buildings.push('tower')
        }
      }

      return acc
    },

    {
      '100': {
        kills: 0,
        gold: 0,
        dragons: [],
        buildings: [] as BuildingType[],
        nashors: 0,
        hordes: 0,
        herald: 0,
        winner: false,
        participants: createParticipants(),
      },
      '200': {
        kills: 0,
        gold: 0,
        dragons: [],
        buildings: [] as BuildingType[],
        nashors: 0,
        hordes: 0,
        herald: 0,
        winner: false,
        participants: createParticipants(5),
      },
    },
  )

  for (const [key, value] of Object.entries(currentFrames)) {
    const teamId = participants.find((p) => p.summonerId === key).teamId

    const participant = (teamsStats[teamId].participants[
      value.participantFrameId
    ] ??= {
      gold: 0,
    })
    participant.champLevel = value.level
    participant.gold = value.totalGold
    participant.currentGold = value.currentGold
    participant.minionsKilled = value.minionsKilled
    participant.positionX = value.positionx
    participant.positionY = value.positiony
    teamsStats[teamId].gold += value.totalGold

    if (participant.lastDeath !== 0) {
      const deathTimer = calculateDeathTimer(
        participant.champLevel,
        participant.lastDeath,
        value.timestamp,
      )

      participant.isDead = deathTimer > 0
      participant.brw = deathTimer
    } else {
      participant.isDead = false
    }
  }

  participants.forEach((p) => {
    const teamId = p.teamId
    let participantFrameId = null

    for (const [key, value] of Object.entries(currentFrames)) {
      if (p.summonerId === key) {
        participantFrameId = value.participantFrameId
      }
    }

    if (participantFrameId) {
      const participant = teamsStats[teamId].participants[participantFrameId]

      participant.champion = p.championName
      participant.gameName = p.summoner.gameName
      participant.teamPosition = p.teamPosition
      participant.summonerId = p.summonerId
      participant.teamId = p.teamId
    }
  })

  return teamsStats
}
