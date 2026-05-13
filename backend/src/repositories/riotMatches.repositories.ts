import { prisma } from '../app'
import type {
  RiotExistentMatchesRequest,
  RiotMatchesRequest,
} from '../dto/riotMatchesDto'
import { getMatchDetails, getMatches, getMatchTimeline } from '../services/riotMatchService'
import { createSummonerByPuuid } from './riotAccount.repositories'

export async function createMatches(request: RiotMatchesRequest) {
  const matches = await getMatches(request)
  for (const match of matches) {
    const doesMatchExist = await prisma.match.findUnique({
      where: { matchId: match },
    })
    const doesParticipantsExist = await readMatch(match)

    if (
      !doesMatchExist ||
      !doesParticipantsExist?.participants ||
      doesParticipantsExist?.participants.length < 10
    ) {
      const matchData = await getMatchDetails({ matchId: match })
      if (!doesMatchExist) {
        try {
          await prisma.match.create({
            data: {
              matchId: match,
              gameDuration: matchData.info.gameDuration,
              gameEndTimestamp: matchData.info.gameEndTimestamp.toString(),
              gameMode: matchData.info.gameMode,
              gameType: matchData.info.gameType,
              platformId: matchData.info.platformId,
              queueId: matchData.info.queueId,
            },
          })
        } catch (e) {
          console.log(e)
        }
      }
      try {
        const participant = matchData.info.participants.filter(
          (data) => data.puuid == request.puuid,
        )[0]
        await createSummonerByPuuid(
          request.puuid,
          match.split('_')[0].toLowerCase(),
        )
        await prisma.participant.upsert({
          where: {
            participantId: { summonerId: request.puuid, matchId: match },
          },
          update: {},
          create: {
            summonerId: participant.puuid,
            matchId: match,
            championName: participant.championName,
            champLevel: participant.champLevel,
            assists: participant.assists,
            deaths: participant.deaths,
            kills: participant.kills,
            lane: participant.lane,
            teamPosition: participant.teamPosition,
            summoner1Id: participant.summoner1Id,
            summoner2Id: participant.summoner2Id,
            neutralMinionsKilled: participant.neutralMinionsKilled,
            totalMinionsKilled: participant.totalMinionsKilled,
            totalDamageDealtToChampions:
              participant.totalDamageDealtToChampions,
            wardsPlaced: participant.wardsPlaced,
            goldEarned: participant.goldEarned,
            item0: participant.item0,
            item1: participant.item1,
            item2: participant.item2,
            item3: participant.item3,
            item4: participant.item4,
            item5: participant.item5,
            item6: participant.item6,
            perksStat0: participant.perks.statPerks.defense,
            perksStat1: participant.perks.statPerks.flex,
            perksStat2: participant.perks.statPerks.offense,
            perksPrimaryStyle: participant.perks.styles[0].style,
            perksPrimaryStyleSelection0:
              participant.perks.styles[0].selections[0].perk,
            perksPrimaryStyleSelection1:
              participant.perks.styles[0].selections[1].perk,
            perksPrimaryStyleSelection2:
              participant.perks.styles[0].selections[2].perk,
            perksPrimaryStyleSelection3:
              participant.perks.styles[0].selections[3].perk,
            perksSubStyle: participant.perks.styles[1].style,
            perksSubStyleSelection0:
              participant.perks.styles[1].selections[0].perk,
            perksSubStyleSelection1:
              participant.perks.styles[1].selections[1].perk,
            teamId: participant.teamId.toString(),
            win: participant.win,
          },
        })
      } catch (e) {
        console.log(e)
      }
    }
  }

  return matches
}
export async function getExistentMatches(request: RiotExistentMatchesRequest) {
  const matches = await prisma.match.findMany({
    take: Number(request.numberOfMatches),
    ...(request.cursor && {
      skip: 1,
      cursor: {
        matchId: request.cursor,
      },
    }),
    where: {
      participants: {
        some: {
          summonerId: request.puuid,
        },
      },
    },
    orderBy: {
      gameEndTimestamp: 'desc',
    },
  })

  const participantMatchesPositionInResults = matches[matches.length - 1]
  const myCursor = participantMatchesPositionInResults?.matchId

  return { data: matches, cursor: myCursor }
}

export async function readMatch(id: string) {
  try {
    const match = await prisma.match.findUnique({
      where: { matchId: id },
      include: {
        participants: {
          include: {
            summoner: {
              include: {
                summonerLeagues: true,
              },
            },
          },
        },
      },
    })

    return match
  } catch (e) {
    console.log(e)
  }
}

export async function createTimelineData(matchId: string) {

  const timelineData = await getMatchTimeline({ matchId })

  const id = String(Date.now()+matchId)

  try {
    await prisma.matchTimeline.create({
      data: {
        matchTimelineId: id,
        matchId: timelineData.metadata.matchId,
      },
    })
  } catch (e) {
    console.log(e)
  }

  for (const frame of timelineData.info.frames) {

    for (const event of frame.events) {
      try {
        await prisma.events.create({
          data: {
            timestamp: event.timestamp,
            type: event.type,
            creatorId: event.creatorId? timelineData.info.participants.filter((data) => event.creatorId == data.participantId)[0].puuid : "",
            wardType: event.wardType,
            itemId: event.itemId,
            participantPuuid: event.participantId ? timelineData.info.participants.filter((data) => event.participantId == data.participantId)[0].puuid : "",
            teamId: event.teamId,
            buildingType: event.buildingType,
            laneType: event.laneType,
            towerType: event.towerType,
            victimId: event.victimId ? timelineData.info.participants.filter((data) => event.victimId == data.participantId)[0].puuid : "",
            killerId: event.killerId ? timelineData.info.participants.filter((data) => event.killerId == data.participantId)[0].puuid : "",
            killType: event.killType,
            multiKillLength: event.multiKillLength,
            positionx: event.position?.x,
            positiony: event.position?.y,
            monsterSubType: event.monsterSubType,
            monsterType: event.monsterType,
            matchTimelineId: id 
          },
        })
      } catch (e) {
        console.log(e)
      }
    }

    for (const [key, participantFrame] of Object.entries(frame.participantFrames)) {
      try {
        await prisma.participantFrames.create({
          data: {
            participantFrameId: Number(key),
            participantPuuid: timelineData.info.participants.filter((data) => Number(key) == data.participantId)[0].puuid,
            timestamp: frame.timestamp,
            positionx: participantFrame.position.x,
            positiony: participantFrame.position.y,
            level: participantFrame.level,
            minionsKilled: participantFrame.minionsKilled,
            totalGold: participantFrame.totalGold,
            totalDamageDoneToChampions: participantFrame.damageStats.totalDamageDoneToChampions,
            matchTimelineId: id 
          },
        })
      } catch (e) {
        console.log(e)
      }
    }

  }

  return timelineData
}
export async function getTimelineData(matchId: string) {

  try {
    const match = await prisma.match.findUnique({
      where: { matchId: matchId },
      include: {
        matchTimeline: {
          include: {
            events: true,
            participantFrames: true
          }
        }
      },
    })

    return match
  } catch (e) {
    console.log(e)
  }
}