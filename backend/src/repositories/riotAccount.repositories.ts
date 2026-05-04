import { Prisma } from '../../prisma/generated/prisma/client'
import { prisma } from '../app'
import type { RiotAccountRequest } from '../dto/riotAccountDto'
import {
  getAccount,
  getSummoner,
  getSummonerNameByPuuid,
} from '../services/riotService'
import { createSummonerLeague } from './riotSummonerLeague.repositories'

export async function createSummoner(request: RiotAccountRequest) {
  if (!request.gameName || !request.tagLine) {
    return 'Missing gameName or tagLine!'
  }
  const account = await getAccount(request)
  const summoner = await getSummoner({
    puuid: account.puuid,
  })

  try {
    await prisma.summoner.upsert({
      where: { id: account.puuid },
      update: {
        gameName: account.gameName,
        tagLine: account.tagLine,
        level: summoner.summonerLevel,
        revisionDate: summoner.revisionDate.toString(),
        profileIconId: summoner.profileIconId,
      },
      create: {
        gameName: account.gameName,
        tagLine: account.tagLine,
        id: account.puuid,
        level: summoner.summonerLevel,
        revisionDate: summoner.revisionDate.toString(),
        region: request.region!,
        profileIconId: summoner.profileIconId,
      },
    })

    await createSummonerLeague({
      puuid: account.puuid,
    })
  } catch (e) {
    console.log(e)
  }
  return summoner
}
export async function createSummonerByPuuid(puuid: string, region: string) {
  const summoner = await getSummoner({
    puuid: puuid,
  })
  const summonerData = await getSummonerNameByPuuid({
    puuid: puuid,
  })

  try {
    await prisma.summoner.upsert({
      where: { id: puuid },
      update: {
        gameName: summonerData.gameName,
        tagLine: summonerData.tagLine,
        level: summoner.summonerLevel,
        revisionDate: summoner.revisionDate.toString(),
        profileIconId: summoner.profileIconId,
      },
      create: {
        gameName: summonerData.gameName,
        tagLine: summonerData.tagLine,
        id: summonerData.puuid,
        level: summoner.summonerLevel,
        revisionDate: summoner.revisionDate.toString(),
        region: region,
        profileIconId: summoner.profileIconId,
      },
    })

    await createSummonerLeague({
      puuid: puuid,
    })
  } catch (e) {
    console.log(e)
  }
  return summoner
}

export async function readAllSummoners() {
  try {
    const summoners = await prisma.summoner.findMany()

    return summoners
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new summoner cannot be created with this puuid',
        )
      }
    } else {
      throw e
    }
  }
}

export async function readSummoner(id: string) {
  try {
    const summoner = await prisma.summoner.findUnique({ where: { id: id } })

    return summoner
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new summoner cannot be created with this puuid',
        )
      }
    } else {
      throw e
    }
  }
}

export async function readSummonerByName(request: RiotAccountRequest) {
  try {
    const summoner = await prisma.summoner.findFirst({
      where: {
        gameName: request.gameName,
        tagLine: request.tagLine,
        region: request.region,
      },
      include: {
        summonerLeagues: true,
      },
    })

    return summoner
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new summoner cannot be created with this puuid',
        )
      }
    } else {
      throw e
    }
  }
}

export async function searchSummoner(request: RiotAccountRequest) {
  try {
    const summoner = await prisma.summoner.findMany({
      where: {
        gameName: {
          contains: request.gameName,
          mode: 'insensitive',
        },
      },
      include: {
        summonerLeagues: true,
      },
      take: 10,
    })

    const summonerStartMatch = await prisma.summoner.findMany({
      where: {
        gameName: {
          startsWith: request.gameName.slice(0, 3),
          mode: 'insensitive',
        },
      },
      include: {
        summonerLeagues: true,
      },
      take: 10,
    })

    const summonerExactlyMatch = await prisma.summoner.findMany({
      where: {
        gameName: {
          equals: request.gameName,
        },
        tagLine: {
          equals: request.tagLine,
        },
      },
      include: {
        summonerLeagues: true,
      },
    })

    return {
      directSearch: summoner,
      startWithSearch: summonerStartMatch,
      summonerExactlyMatch: summonerExactlyMatch,
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        console.log(
          'There is a unique constraint violation, a new summoner cannot be created with this puuid',
        )
      }
    } else {
      throw e
    }
  }
}
