import type { MatchEvent } from '#/shared/game/MatchEvent/types'

export function aggregateTeamsStatus(
  events: MatchEvent[],
  currentFrames,
  participants,
) {
  console.log('currentfra,es', currentFrames)

  function createParticipants(start = 0) {
    return Object.fromEntries(
      Array.from({ length: 5 }, (_, i) => [
        start + i + 1,
        {
          kills: 0,
          deaths: 0,
          assists: 0,
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
            const participant = (acc[
              teamId === '100' ? '200' : '100'
            ].participants[participantVictimId] ??= {
              deaths: 0,
            })

            participant.deaths++
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

      return acc
    },

    {
      '100': {
        kills: 0,
        gold: 0,
        dragons: [],
        buildings: [],
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
        buildings: [],
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

    participant.gold = value.totalGold
    teamsStats[teamId].gold += value.totalGold
  }

  console.log('team stats', teamsStats)

  return 'test'
}
