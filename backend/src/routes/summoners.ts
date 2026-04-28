import type { FastifyInstance } from 'fastify'
import {
  readAllSummoners,
  readSummoner,
} from '../repositories/riotAccount.repositories'

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
}
