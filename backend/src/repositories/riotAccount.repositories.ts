/*  TO DO

SUMMONER
Read Summoner
Create Summoner
Upsert Summoner
Delete Summoner

SUMMONER LEAGUE
Read SummonerLeague
Create SummonerLeague
Upsert SummonerLeague
Delete SummonerLeague

*/

import { Prisma } from '../../prisma/generated/prisma/client'
import { prisma } from '../app'
import type { RiotAccountRequest } from '../dto/riotAccountDto'
import { getRiotAccount } from '../services/riotService'

export async function createSummoner(request: RiotAccountRequest) {
  const summoner = await getRiotAccount(request)

  try {
    await prisma.summoner.create({
      data: {
        gameName: summoner.gameName,
        tagLine: summoner.tagLine,
        id: summoner.puuid,
      },
    })
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
