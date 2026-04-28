import type { FastifyInstance } from 'fastify'
import { readAllSummoners } from '../repositories/riotAccount.repositories'

export async function summonersRoutes(app: FastifyInstance) {
  app.get('/summoners', async () => {
    const summoners = await readAllSummoners()

    return summoners
  })

  //   app.get('/summoners/:summonersId', async (request) => {
  //     const { matchId } = request.params as { matchId: string }

  //     return {
  //       example: true,
  //       description: 'Dados de match — a implementar',
  //       matchId,
  //     }
  //   })
}
