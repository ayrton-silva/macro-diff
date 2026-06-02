import type { MatchEvent } from '#/shared/game/MatchEvent/types'

export function aggregateTeamsStatus(
  events: MatchEvent[],
  currentFrames,
  participants,
) {
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

      console.log('current frames', currentFrames)

      return acc
    },

    {
      '100': {
        kills: 0,
        dragons: [],
        buildings: [],
        nashors: 0,
        hordes: 0,
        herald: 0,
        // participants: {
        //   1: {
        //     kills,
        //     gold,
        //     ...
        //   },
        //   2:
        // }
      },
      '200': {
        kills: 0,
        dragons: [],
        buildings: [],
        nashors: 0,
        hordes: 0,
        herald: 0,
      },
    },
  )

  console.log('team stats', teamsStats)

  return 'test'
}
