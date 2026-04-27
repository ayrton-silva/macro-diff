import type { FastifyInstance } from 'fastify'

export async function rootRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    service: 'macro-diff-api',
    note: 'Rotas de exemplo — sem integração Riot ainda.',
  }))
}
