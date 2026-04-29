import { prisma } from '../app'
import type { RiotMatchesRequest } from '../dto/riotMatchesDto'
import { getMatchDetails, getMatches } from '../services/riotMatchService'
import { createSummoner } from './riotAccount.repositories'

export async function createMatches(request: RiotMatchesRequest) {
  const matches = await getMatches(request)


  for (const match of matches) {
    const doesMatchExist = await prisma.match.findUnique({
            where: { matchId: match }
    })
    if(!doesMatchExist){
        
    const matchData = await getMatchDetails({ matchId: match })

    try {
      await prisma.match.create({
        data: {
          matchId: match,
          gameDuration: matchData.info.gameDuration,
          gameMode: matchData.info.gameMode,
        },
      })
    } catch (e) {
      console.log(e)
    }

        for (const participant of matchData.info.participants) {
        try {
            await createSummoner({
            gameName: participant.riotIdGameName,
            tagLine: participant.riotIdTagline,
            })

            await prisma.participant.upsert({
            where: {
                participantId: { summonerId: participant.puuid, matchId: match },
            },
            update: {},
            create: {
                summonerId: participant.puuid,
                matchId: match,
                championName: participant.championName,
                lane: participant.lane,
                teamPosition: participant.teamPosition,
                summoner1Id: participant.summoner1Id,
                summoner2Id: participant.summoner2Id,
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
                win: participant.win
            },
            })
        } catch (e) {
            console.log(e)
        }
        }
    }
    }

  return matches
}

export async function readMatch(id: string) {
  try {
    const match = await prisma.match.findUnique({
      where: { matchId: id },
      include: {
        participants: true,
      },
    })

    return match
  } catch (e) {
    console.log(e)
  }
}
