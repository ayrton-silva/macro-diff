import { prisma } from '../app'
import type { RiotExistentMatchesRequest, RiotMatchesRequest } from '../dto/riotMatchesDto'
import { getMatchDetails, getMatches } from '../services/riotMatchService'
import { createSummonerByPuuid } from './riotAccount.repositories'

export async function createMatches(request: RiotMatchesRequest) {
    const matches = await getMatches(request)

    for (const match of matches) {
        const doesMatchExist = await prisma.match.findUnique({
            where: { matchId: match },
        })
        if (!doesMatchExist) {
            const matchData = await getMatchDetails({ matchId: match })
            if (matchData.info.gameDuration > 240) {
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

                for (const participant of matchData.info.participants) {
                    try {
                        await createSummonerByPuuid(participant.puuid, match.split('_')[0].toLowerCase())

                        await prisma.participant.upsert({
                            where: {
                                participantId: { summonerId: participant.puuid, matchId: match },
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
                                perksPrimaryStyleSelection0: participant.perks.styles[0].selections[0].perk,
                                perksPrimaryStyleSelection1: participant.perks.styles[0].selections[1].perk,
                                perksPrimaryStyleSelection2: participant.perks.styles[0].selections[2].perk,
                                perksPrimaryStyleSelection3: participant.perks.styles[0].selections[3].perk,
                                perksSubStyle: participant.perks.styles[1].style,
                                perksSubStyleSelection0: participant.perks.styles[1].selections[0].perk,
                                perksSubStyleSelection1: participant.perks.styles[1].selections[1].perk,
                                teamId: participant.teamId.toString(),
                                win: participant.win,
                            },
                        })
                    } catch (e) {
                        console.log(e)
                    }

                }
            }
        }
    }

    return matches
}
export async function getExistentMatches(request: RiotExistentMatchesRequest) {
    const participantMatches = await prisma.participant.findMany({
        where: {
            summonerId: request.puuid
        },
        take: Number(request.numberOfMatches),
        skip: Number(request.skip),
        select: {
            matchId: true
        }
    })
    let response = []
    for (let i = 0; i < participantMatches.length; i++) {
        response.push(participantMatches[i].matchId);
    }
    return response
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
