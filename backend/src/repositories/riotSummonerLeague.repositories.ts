import { prisma } from '../app'
import type { RiotSummonerLeagueRequest } from '../dto/riotSummonerLeagueDto'
import { getSummonerLeague } from '../services/riotService'

export async function createSummonerLeague(request: RiotSummonerLeagueRequest) {
  const summonerLeague = await getSummonerLeague({
    puuid: request.puuid,
  })

  for (const league of summonerLeague) {
    try {
      await prisma.summonerLeague.upsert({
        where: { id: league.leagueId },
        update: {
          tier: league.tier,
          rank: league.rank,
          leaguePoints: league.leaguePoints,
          wins: league.wins,
          losses: league.losses,
          veteran: league.veteran,
          inactive: league.inactive,
          freshBlood: league.freshBlood,
          hotStreak: league.hotStreak,
        },
        create: {
          id: league.leagueId,
          queueType: league.queueType,
          tier: league.tier,
          rank: league.rank,
          summonerId: request.puuid,
          leaguePoints: league.leaguePoints,
          wins: league.wins,
          losses: league.losses,
          veteran: league.veteran,
          inactive: league.inactive,
          freshBlood: league.freshBlood,
          hotStreak: league.hotStreak,
        },
      })
    } catch (e) {
      console.log(e)
    }
  }
}
