import type { FastifyInstance } from 'fastify'

/** Rotas de exemplo para match + timeline (corpo vazio / stub). */
export async function matchRoutes(app: FastifyInstance) {
  app.get('/:matchId/timeline', async (request) => {
    const { matchId } = request.params as { matchId: string }
    return {
      example: true,
      description: 'Timeline por minuto — a implementar',
      matchId,
    }
  })

  app.get('/:matchId', async (request) => {
    const { matchId } = request.params as { matchId: string }
    return {
      example: true,
      description: 'Dados de match — a implementar',
      matchId,
    }
  })
}
