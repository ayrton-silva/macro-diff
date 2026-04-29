import type { FastifyInstance } from 'fastify'
import {
  createSummoner,
  readAllSummoners,
  readSummoner,
} from '../repositories/riotAccount.repositories'
import type { RiotAccountRequest } from '../dto/riotAccountDto'

export async function summonersRoutes(app: FastifyInstance) {
  app.get('/summoners', async () => {
    const summoners = await readAllSummoners()

    return summoners
  })

  app.get('/summoners/:summonerId', async (request) => {
    const { summonerId } = request.params as { summonerId: string }
    const summoner = await readSummoner(summonerId)

    return summoner
  })

  app.post('/summoners', async (request) => {
    const { gameName, tagLine, region } = request.body as RiotAccountRequest
    const summoner = await createSummoner({ gameName, tagLine, region })

    return summoner
  })
}
