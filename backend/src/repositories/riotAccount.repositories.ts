import { Prisma } from '../../prisma/generated/prisma/client'
import { prisma } from '../app'
import type { RiotAccountRequest } from '../dto/riotAccountDto'
import { getAccount, getSummoner } from '../services/riotService'
import { createSummonerLeague } from './riotSummonerLeague.repositories'

export async function createSummoner(request: RiotAccountRequest) {
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
        profileIconId: summoner.profileIconId,
      },
    })

    await createSummonerLeague({
      puuid: account.puuid,
    })
  } catch (e) {
    console.log(e)
  }
  return { "Summoner created!": { "summoner": account.gameName } }
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

export async function searchSummoner(request: RiotAccountRequest) {
  try {
    const summoner = await prisma.summoner.findMany({
      where: {
        gameName: {
          contains: request.gameName,
          mode: "insensitive",
        },
      }
    })

    const summonerStartMatch = await prisma.summoner.findMany({
      where: {
        gameName: {
          startsWith: request.gameName.slice(0, 3),
          mode: "insensitive",
        },
      }
    })

    return { "directSearch": summoner, "startWithSearch": summonerStartMatch }
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
