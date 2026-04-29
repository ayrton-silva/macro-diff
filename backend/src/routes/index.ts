import type { FastifyInstance } from 'fastify'
import { summonersRoutes } from './summoners.js'
import { matchesRoutes } from './matches.js'

export async function registerRoutes(app: FastifyInstance) {
  await app.register(rootRoutes)
  await app.register(healthRoutes)
  await app.register(summonersRoutes)
  await app.register(matchesRoutes)
}

export async function rootRoutes(app: FastifyInstance) {
  app.get('/', async () => ({
    service: 'macro-diff-api',
    note: '',
  }))
}
export async function healthRoutes(app: FastifyInstance) {
  app.get('/health', async () => ({ status: 'ok' }))
}

